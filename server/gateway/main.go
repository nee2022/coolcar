package main

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"
	carpb "coolcar/car/api/gen/v1"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/auth"
	"coolcar/shared/server"
	"log"
	"net/http"
	"net/textproto"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"google.golang.org/grpc"
)

func main() {
	lg, err := server.NewZapLogger()
	if err != nil {
		log.Fatalf("cannot create zap logger: %v", err)
	}
	c := context.Background()
	c, cancel := context.WithCancel(c)
	defer cancel()

	mux := runtime.NewServeMux(runtime.WithMarshalerOption(
		runtime.MIMEWildcard, &runtime.JSONPb{
			EnumsAsInts: true,
			OrigName:    true,
		},
	), runtime.WithIncomingHeaderMatcher(func(key string) (string, bool) {
		if key == textproto.CanonicalMIMEHeaderKey(runtime.MetadataHeaderPrefix+auth.ImpersonateAccountHeader) {
			return "", false
		}
		return runtime.DefaultHeaderMatcher(key)
	}))

	serverConfig := []struct {
		name         string
		addr         string
		registerFunc func(ctx context.Context, mux *runtime.ServeMux, endpoint string, opts []grpc.DialOption) (err error)
	}{
		{
			name:         "auth",
			addr:         "localhost:8081",
			registerFunc: authpb.RegisterAuthServiceHandlerFromEndpoint,
		},
		{
			name:         "trip",
			addr:         "localhost:8082",
			registerFunc: rentalpb.RegisterTripServiceHandlerFromEndpoint,
		},
		{
			name:         "profile",
			addr:         "localhost:8082",
			registerFunc: rentalpb.RegisterProfileServiceHandlerFromEndpoint,
		},
		{
			name:         "car",
			addr:         "localhost:8084",
			registerFunc: carpb.RegisterCarServiceHandlerFromEndpoint,
		},
	}

	for _, s := range serverConfig {
		err := s.registerFunc(
			c, mux, s.addr,
			[]grpc.DialOption{grpc.WithInsecure()},
		)
		if err != nil {
			lg.Sugar().Fatalf("cannot register service %s: %v", s.name, err)
		}
	}
	addr := ":8080"
	lg.Sugar().Infof("grpc gateway started at %s", addr)
	lg.Sugar().Fatal(http.ListenAndServe(addr, mux))
}
