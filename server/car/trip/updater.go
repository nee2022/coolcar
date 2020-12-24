package trip

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"coolcar/car/mq"
	rentalpb "coolcar/rental/api/gen/v1"

	"go.uber.org/zap"
)

// RunUpdater runs a trip updater.
func RunUpdater(sub mq.Subscriber, ts rentalpb.TripServiceClient, logger *zap.Logger) {
	ch, cleanUp, err := sub.Subscribe(context.Background())
	defer cleanUp()

	if err != nil {
		logger.Fatal("cannot subscribe", zap.Error(err))
	}

	for car := range ch {
		if car.Car.Status == carpb.CarStatus_UNLOCKED &&
			car.Car.TripId != "" && car.Car.Driver.Id != "" {
			_, err := ts.UpdateTrip(context.Background(), &rentalpb.UpdateTripRequest{
				Id: car.Car.TripId,
				Current: &rentalpb.Location{
					Latitude:  car.Car.Position.Latitude,
					Longitude: car.Car.Position.Longitude,
				},
			})
			if err != nil {
				logger.Error("cannot update trip", zap.String("trip_id", car.Car.TripId), zap.Error(err))
			}
		}
	}
}
