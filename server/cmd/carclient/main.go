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
	for i := 0; i < 5; i++ {
		res, err := cs.CreateCar(c, &carpb.CreateCarRequest{})
		if err != nil {
			panic(err)
		}
		fmt.Printf("created car: %s\n", res.Id)
	}
}
