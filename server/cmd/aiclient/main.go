package main

import (
	"context"
	"coolcar/car/mq/amqpclt"
	coolenvpb "coolcar/shared/coolenv"
	"coolcar/shared/server"
	"encoding/json"
	"fmt"
	"time"

	"github.com/streadway/amqp"
	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial("localhost:18001", grpc.WithInsecure())
	if err != nil {
		panic(err)
	}

	ac := coolenvpb.NewAIServiceClient(conn)
	c := context.Background()

	// Measure distance.
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

	// Licsense recognition.
	idRes, err := ac.LicIdentity(c, &coolenvpb.IdentityRequest{
		Photo: []byte{1, 2, 3, 4, 5},
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", idRes)

	// Car position simulation.
	_, err = ac.SimulateCarPos(c, &coolenvpb.SimulateCarPosRequest{
		CarId: "car123",
		InitialPos: &coolenvpb.Location{
			Latitude:  30,
			Longitude: 120,
		},
		Type: coolenvpb.PosType_NINGBO,
	})
	if err != nil {
		panic(err)
	}

	logger, err := server.NewZapLogger()
	if err != nil {
		panic(err)
	}

	amqpConn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		panic(err)
	}

	sub, err := amqpclt.NewSubscriber(amqpConn, "pos_sim", logger)
	if err != nil {
		panic(err)
	}

	ch, cleanUp, err := sub.SubscribeRaw(c)
	defer cleanUp()

	if err != nil {
		panic(err)
	}

	tm := time.After(10 * time.Second)
	for {
		shouldStop := false
		select {
		case msg := <-ch:
			var update coolenvpb.CarPosUpdate
			err = json.Unmarshal(msg.Body, &update)
			if err != nil {
				panic(err)
			}
			fmt.Printf("%+v\n", &update)
		case <-tm:
			shouldStop = true
		}
		if shouldStop {
			break
		}
	}

	_, err = ac.EndSimulateCarPos(c, &coolenvpb.EndSimulateCarPosRequest{
		CarId: "car123",
	})
	if err != nil {
		panic(err)
	}
}
