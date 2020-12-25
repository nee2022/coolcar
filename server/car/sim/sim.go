package sim

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"coolcar/car/mq"
	coolenvpb "coolcar/shared/coolenv"
	"fmt"
	"time"

	"go.uber.org/zap"
)

// PosSubscriber defines interface for a car position subscriber.
type PosSubscriber interface {
	Subscribe(context.Context) (ch chan *coolenvpb.CarPosUpdate, cleanUp func(), err error)
}

// Controller defines a car simulation controller.
type Controller struct {
	CarService    carpb.CarServiceClient
	AIService     coolenvpb.AIServiceClient
	CarSubscriber mq.Subscriber
	PosSubscriber PosSubscriber
	Logger        *zap.Logger
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

	carCh, carCleanUp, err := c.CarSubscriber.Subscribe(ctx)
	defer carCleanUp()
	if err != nil {
		c.Logger.Error("cannot subscribe car", zap.Error(err))
		return
	}

	posCh, posCleanUp, err := c.PosSubscriber.Subscribe(ctx)
	defer posCleanUp()
	if err != nil {
		c.Logger.Error("cannot subscribe position", zap.Error(err))
		return
	}

	carChans := make(map[string]chan *carpb.Car)
	posChans := make(map[string]chan *carpb.Location)
	for _, car := range cars {
		carFanoutCh := make(chan *carpb.Car)
		carChans[car.Id] = carFanoutCh
		posFanoutCh := make(chan *carpb.Location)
		posChans[car.Id] = posFanoutCh
		go c.SimulateCar(context.Background(), car, carFanoutCh, posFanoutCh)
	}

	for {
		select {
		case carUpdate := <-carCh:
			ch := carChans[carUpdate.Id]
			if ch != nil {
				ch <- carUpdate.Car
			}
		case posUpdate := <-posCh:
			ch := posChans[posUpdate.CarId]
			if ch != nil {
				ch <- &carpb.Location{
					Latitude:  posUpdate.Pos.Latitude,
					Longitude: posUpdate.Pos.Longitude,
				}
			}
		}
	}
}

// SimulateCar simulates a single car.
func (c *Controller) SimulateCar(ctx context.Context, initial *carpb.CarEntity, carCh chan *carpb.Car, posCh chan *carpb.Location) {
	car := initial
	c.Logger.Info("Simulating car.", zap.String("id", car.Id))

	for {
		select {
		case update := <-carCh:
			if update.Status == carpb.CarStatus_UNLOCKING {
				updated, err := c.unlockCar(ctx, car)
				if err != nil {
					c.Logger.Error("cannot unlock car", zap.String("id", car.Id), zap.Error(err))
					break
				}
				car = updated
			} else if update.Status == carpb.CarStatus_LOCKING {
				updated, err := c.lockCar(ctx, car)
				if err != nil {
					c.Logger.Error("cannot lock car", zap.String("id", car.Id), zap.Error(err))
					break
				}
				car = updated
			}
		case pos := <-posCh:
			updated, err := c.moveCar(ctx, car, pos)
			if err != nil {
				c.Logger.Error("cannot move car", zap.String("id", car.Id), zap.Error(err))
				break
			}
			car = updated
		}
	}
}

func (c *Controller) lockCar(ctx context.Context, car *carpb.CarEntity) (*carpb.CarEntity, error) {
	car.Car.Status = carpb.CarStatus_LOCKED
	_, err := c.CarService.UpdateCar(ctx, &carpb.UpdateCarRequest{
		Id:     car.Id,
		Status: carpb.CarStatus_LOCKED,
	})
	if err != nil {
		return nil, fmt.Errorf("cannot update car state: %v", err)
	}

	_, err = c.AIService.EndSimulateCarPos(ctx, &coolenvpb.EndSimulateCarPosRequest{
		CarId: car.Id,
	})
	if err != nil {
		return nil, fmt.Errorf("cannot end simulation: %v", err)
	}

	return car, nil
}

func (c *Controller) unlockCar(ctx context.Context, car *carpb.CarEntity) (*carpb.CarEntity, error) {
	car.Car.Status = carpb.CarStatus_UNLOCKED
	_, err := c.CarService.UpdateCar(ctx, &carpb.UpdateCarRequest{
		Id:     car.Id,
		Status: carpb.CarStatus_UNLOCKED,
	})
	if err != nil {
		return nil, fmt.Errorf("cannot update car state: %v", err)
	}

	_, err = c.AIService.SimulateCarPos(ctx, &coolenvpb.SimulateCarPosRequest{
		CarId: car.Id,
		InitialPos: &coolenvpb.Location{
			Latitude:  car.Car.Position.Latitude,
			Longitude: car.Car.Position.Longitude,
		},
		Type: coolenvpb.PosType_NINGBO,
	})
	if err != nil {
		return nil, fmt.Errorf("cannot simulate car position: %v", err)
	}
	return car, nil
}

func (c *Controller) moveCar(ctx context.Context, car *carpb.CarEntity, pos *carpb.Location) (*carpb.CarEntity, error) {
	car.Car.Position = pos
	_, err := c.CarService.UpdateCar(ctx, &carpb.UpdateCarRequest{
		Id:       car.Id,
		Position: pos,
	})
	if err != nil {
		return nil, fmt.Errorf("cannot update car: %v", err)
	}
	return car, nil
}
