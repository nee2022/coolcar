package car

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"coolcar/car/dao"
	"coolcar/shared/id"
	mgutil "coolcar/shared/mongo"
	mongotesting "coolcar/shared/mongo/testing"
	"coolcar/shared/server"
	"encoding/json"
	"os"
	"testing"
)

func TestCarUpdate(t *testing.T) {
	c := context.Background()
	mc, err := mongotesting.NewClient(c)
	if err != nil {
		t.Fatalf("cannot create mongo client: %v", err)
	}

	logger, err := server.NewZapLogger()
	if err != nil {
		t.Fatalf("cannot create logger: %v", err)
	}

	s := &Service{
		Logger:    logger,
		Mongo:     dao.NewMongo(mc.Database("coolcar")),
		Publisher: &testPublisher{},
	}

	carID := id.CarID("5f8132eb22814bf629489056")
	mgutil.NewObjIDWithValue(carID)
	_, err = s.CreateCar(c, &carpb.CreateCarRequest{})
	if err != nil {
		t.Fatalf("cannot create car: %v", err)
	}

	cases := []struct {
		name    string
		op      func() error
		want    string
		wantErr bool
	}{
		{
			name: "get_car",
			op: func() error {
				return nil
			},
			want: `{"status":1,"position":{"latitude":30,"longitude":120}}`,
		},
		{
			name: "unlock_car",
			op: func() error {
				_, err := s.UnlockCar(c, &carpb.UnlockCarRequest{
					Id:     carID.String(),
					TripId: "test_trip",
					Driver: &carpb.Driver{
						Id:        "test_driver",
						AvatarUrl: "test_avatar",
					},
				})
				return err
			},
			want: `{"status":2,"driver":{"id":"test_driver","avatar_url":"test_avatar"},"position":{"latitude":30,"longitude":120},"trip_id":"test_trip"}`,
		},
		{
			name: "unlock_complete",
			op: func() error {
				_, err := s.UpdateCar(c, &carpb.UpdateCarRequest{
					Id: carID.String(),
					Position: &carpb.Location{
						Latitude:  31,
						Longitude: 121,
					},
					Status: carpb.CarStatus_UNLOCKED,
				})
				return err
			},
			want: `{"status":3,"driver":{"id":"test_driver","avatar_url":"test_avatar"},"position":{"latitude":31,"longitude":121},"trip_id":"test_trip"}`,
		},
		{
			name: "unlock_car_by_another_driver",
			op: func() error {
				_, err := s.UnlockCar(c, &carpb.UnlockCarRequest{
					Id:     carID.String(),
					TripId: "bad_trip",
					Driver: &carpb.Driver{
						Id:        "bad_driver",
						AvatarUrl: "test_avatar",
					},
				})
				return err
			},
			wantErr: true,
		},
		{
			name: "lock_car",
			op: func() error {
				_, err := s.LockCar(c, &carpb.LockCarRequest{
					Id: carID.String(),
				})
				return err
			},
			want: `{"status":4,"driver":{"id":"test_driver","avatar_url":"test_avatar"},"position":{"latitude":31,"longitude":121},"trip_id":"test_trip"}`,
		},
		{
			name: "lock_complete",
			op: func() error {
				_, err := s.UpdateCar(c, &carpb.UpdateCarRequest{
					Id:     carID.String(),
					Status: carpb.CarStatus_LOCKED,
				})
				return err
			},
			want: `{"status":1,"driver":{},"position":{"latitude":31,"longitude":121}}`,
		},
	}
	for _, cc := range cases {
		err := cc.op()
		if cc.wantErr {
			if err == nil {
				t.Errorf("%s: want error; got none", cc.name)
			} else {
				continue
			}
		}
		if err != nil {
			t.Errorf("%s: operation failed: %v", cc.name, err)
			continue
		}
		car, err := s.GetCar(c, &carpb.GetCarRequest{
			Id: carID.String(),
		})
		if err != nil {
			t.Errorf("%s: cannot get car after operation: %v", cc.name, err)
		}
		b, err := json.Marshal(car)
		if err != nil {
			t.Errorf("%s: failed marshalling response: %v", cc.name, err)
		}
		got := string(b)
		if cc.want != got {
			t.Errorf("%s: incorrect response; want: %s, got: %s", cc.name, cc.want, got)
		}
	}
}

func TestMain(m *testing.M) {
	os.Exit(mongotesting.RunWithMongoInDocker(m))
}

type testPublisher struct{}

func (p *testPublisher) Publish(context.Context, *carpb.CarEntity) error {
	return nil
}
