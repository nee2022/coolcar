package main

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"fmt"

	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial("localhost:8084", grpc.WithInsecure())
	if err != nil {
		panic(err)
	}
	cs := carpb.NewCarServiceClient(conn)
	c := context.Background()

	// Create some cars.
	// for i := 0; i < 5; i++ {
	// 	res, err := cs.CreateCar(c, &carpb.CreateCarRequest{})
	// 	if err != nil {
	// 		panic(err)
	// 	}
	// 	fmt.Printf("created car: %s\n", res.Id)
	// }

	// Reset all cars.
	res, err := cs.GetCars(c, &carpb.GetCarsRequest{})
	if err != nil {
		panic(err)
	}
	for _, car := range res.Cars {
		_, err := cs.UpdateCar(c, &carpb.UpdateCarRequest{
			Id:     car.Id,
			Status: carpb.CarStatus_LOCKED,
		})
		if err != nil {
			fmt.Printf("cannot reset car %q: %v", car.Id, err)
		}
	}
	fmt.Printf("%d cars are reset.\n", len(res.Cars))
}
