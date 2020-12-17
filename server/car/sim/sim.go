package sim

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"time"

	"go.uber.org/zap"
)

// Subscriber defines a car update subscriber.
type Subscriber interface {
	Subscribe(context.Context) (ch chan *carpb.CarEntity, cleanUp func(), err error)
}

// Controller defines a car simulation controller.
type Controller struct {
	CarService carpb.CarServiceClient
	Subscriber Subscriber
	Logger     *zap.Logger
}

// RunSimulations runs simulations for all cars.
func (c *Controller) RunSimulations(ctx context.Context) {
	var cars []*carpb.CarEntity
	for {
		time.Sleep(3 * time.Second)
		res, err := c.CarService.GetCars(ctx, &carpb.GetCarsRequest{})
		if err != nil {
			c.Logger.Error("cannot get cars", zap.Error(err))
			continue
		}
		cars = res.Cars
		break
	}

	c.Logger.Info("Running car simulations.", zap.Int("car_count", len(cars)))

	msgCh, cleanUp, err := c.Subscriber.Subscribe(ctx)
	defer cleanUp()

	if err != nil {
		c.Logger.Error("cannot subscribe", zap.Error(err))
		return
	}

	carChans := make(map[string]chan *carpb.Car)
	for _, car := range cars {
		ch := make(chan *carpb.Car)
		carChans[car.Id] = ch
		go c.SimulateCar(context.Background(), car, ch)
	}

	for carUpdate := range msgCh {
		ch := carChans[carUpdate.Id]
		if ch != nil {
			ch <- carUpdate.Car
		}
	}
}

// SimulateCar simulates a single car.
func (c *Controller) SimulateCar(ctx context.Context, initial *carpb.CarEntity, ch chan *carpb.Car) {
	carID := initial.Id
	c.Logger.Info("Simulating car.", zap.String("id", carID))

	for update := range ch {
		if update.Status == carpb.CarStatus_UNLOCKING {
			_, err := c.CarService.UpdateCar(ctx, &carpb.UpdateCarRequest{
				Id:     carID,
				Status: carpb.CarStatus_UNLOCKED,
			})
			if err != nil {
				c.Logger.Error("cannot unlock car", zap.Error(err))
			}
		} else if update.Status == carpb.CarStatus_LOCKING {
			_, err := c.CarService.UpdateCar(ctx, &carpb.UpdateCarRequest{
				Id:     carID,
				Status: carpb.CarStatus_LOCKED,
			})
			if err != nil {
				c.Logger.Error("cannot lock car", zap.Error(err))
			}
		}
	}
}
