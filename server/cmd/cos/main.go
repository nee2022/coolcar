package main

import (
	"context"
	blobpb "coolcar/blob/api/gen/v1"
	"fmt"

	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial("localhost:8083", grpc.WithInsecure())
	if err != nil {
		panic(err)
	}
	c := blobpb.NewBlobServiceClient(conn)

	ctx := context.Background()
	// res, err := c.CreateBlob(ctx, &blobpb.CreateBlobRequest{
	// 	AccountId:           "account_2",
	// 	UploadUrlTimeoutSec: 1000,
	// })
	// res, err := c.GetBlob(ctx, &blobpb.GetBlobRequest{
	// 	Id: "5f955ed5990a93a381d82050",
	// })
	res, err := c.GetBlobURL(ctx, &blobpb.GetBlobURLRequest{
		Id:         "5f955ed5990a93a381d82050",
		TimeoutSec: 100,
	})
	if err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", res)
}
