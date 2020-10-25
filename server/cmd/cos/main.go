package main

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"time"

	"github.com/tencentyun/cos-go-sdk-v5"
)

func main() {
	u, err := url.Parse("https://coolcar-1256512285.cos.ap-shanghai.myqcloud.com")
	if err != nil {
		panic(err)
	}
	b := &cos.BaseURL{BucketURL: u}
	secID := "AKIDxg9KGuqSJ2WjgOd99sZ7PQBfusZ7kVJq"
	secKey := "SgfO1UgbRUJq89MWRQbYEe0N8lDrNhph"
	client := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  secID,
			SecretKey: secKey,
		},
	})
	name := "abc.jpg"
	presignedURL, err := client.Object.GetPresignedURL(
		context.Background(),
		http.MethodGet, name, secID, secKey, 10*time.Second, nil)
	if err != nil {
		panic(err)
	}
	fmt.Println(presignedURL)
}
