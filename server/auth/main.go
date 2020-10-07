package main

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"
	"coolcar/auth/auth"
	"coolcar/auth/dao"
	"coolcar/auth/token"
	"coolcar/auth/wechat"
	"io/ioutil"
	"log"
	"net"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
)

func main() {
	logger, err := newZapLogger()
	if err != nil {
		log.Fatalf("cannot create logger: %v", err)
	}

	lis, err := net.Listen("tcp", ":8081")
	if err != nil {
		logger.Fatal("cannot listen", zap.Error(err))
	}

	c := context.Background()
	mongoClient, err := mongo.Connect(c, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		logger.Fatal("cannot connect mongodb", zap.Error(err))
	}

	pkFile, err := os.Open("auth/private.key")
	if err != nil {
		logger.Fatal("cannot open private key", zap.Error(err))
	}

	pkBytes, err := ioutil.ReadAll(pkFile)
	if err != nil {
		logger.Fatal("cannot read private key", zap.Error(err))
	}

	privKey, err := jwt.ParseRSAPrivateKeyFromPEM(pkBytes)
	if err != nil {
		logger.Fatal("cannot parse private key", zap.Error(err))
	}

	s := grpc.NewServer()
	authpb.RegisterAuthServiceServer(s, &auth.Service{
		OpenIDResolver: &wechat.Service{
			AppID:     "wxb029f5e27e2b0ffc",
			AppSecret: "45b1721d5fad8b80b8ee93dff46ab32e",
		},
		Mongo:          dao.NewMongo(mongoClient.Database("coolcar")),
		Logger:         logger,
		TokenExpire:    2 * time.Hour,
		TokenGenerator: token.NewJWTTokenGen("coolcar/auth", privKey),
	})

	err = s.Serve(lis)
	logger.Fatal("cannot server", zap.Error(err))
}

func newZapLogger() (*zap.Logger, error) {
	cfg := zap.NewDevelopmentConfig()
	cfg.EncoderConfig.TimeKey = ""
	return cfg.Build()
}
