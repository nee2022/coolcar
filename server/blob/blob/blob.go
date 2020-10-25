package blob

import (
	"context"
	blobpb "coolcar/blob/api/gen/v1"
	"coolcar/blob/dao"

	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Service defines a blob service.
type Service struct {
	Mongo  *dao.Mongo
	Logger *zap.Logger
}

// CreateBlob creates a blob.
func (s *Service) CreateBlob(c context.Context, req *blobpb.CreateBlobRequest) (*blobpb.CreateBlobResponse, error) {
	return nil, status.Error(codes.Unimplemented, "")
}

// GetBlob gets a blob's contents.
func (s *Service) GetBlob(c context.Context, req *blobpb.GetBlobRequest) (*blobpb.GetBlobResponse, error) {
	return nil, status.Error(codes.Unimplemented, "")
}

// GetBlobURL gets blob's URL for downloading.
func (s *Service) GetBlobURL(c context.Context, req *blobpb.GetBlobURLRequest) (*blobpb.GetBlobURLResponse, error) {
	return nil, status.Error(codes.Unimplemented, "")
}
