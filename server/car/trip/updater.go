package trip

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"coolcar/car/mq"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/auth"
	"coolcar/shared/id"

	"go.uber.org/zap"
	"google.golang.org/grpc"
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
			}, grpc.PerRPCCredentials(&impersonation{
				AccountID: id.AccountID(car.Car.Driver.Id),
			}))
			if err != nil {
				logger.Error("cannot update trip", zap.String("trip_id", car.Car.TripId), zap.Error(err))
			}
		}
	}
}

type impersonation struct {
	AccountID id.AccountID
}

func (i *impersonation) GetRequestMetadata(ctx context.Context, uri ...string) (map[string]string, error) {
	return map[string]string{
		auth.ImpersonateAccountHeader: i.AccountID.String(),
	}, nil
}

func (i *impersonation) RequireTransportSecurity() bool {
	return false
}
