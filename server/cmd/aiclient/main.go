package main

import (
	"context"
	coolenvpb "coolcar/shared/coolenv"
	"fmt"

	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial("localhost:18001", grpc.WithInsecure())
	if err != nil {
		panic(err)
	}

	ac := coolenvpb.NewAIServiceClient(conn)
	c := context.Background()
	res, err := ac.MeasureDistance(c, &coolenvpb.MeasureDistanceRequest{
		From: &coolenvpb.Location{
			Latitude:  29.756825521115363,
			Longitude: 121.87222114786053,
		},
		To: &coolenvpb.Location{
			Latitude:  29.757211315878838,
			Longitude: 121.87024571958649,
		},
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", res)
}
