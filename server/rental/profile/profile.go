package profile

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"

	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Service defines a profile service.
type Service struct {
	Logger *zap.Logger
}

// GetProfile gets profile for the current account.
func (s *Service) GetProfile(c context.Context, req *rentalpb.GetProfileRequest) (*rentalpb.Profile, error) {
	return nil, status.Error(codes.Unimplemented, "")
}

// UpdateProfile updates profile for the current account.
func (s *Service) UpdateProfile(c context.Context, p *rentalpb.Profile) (*rentalpb.UpdateProfileResponse, error) {
	return nil, status.Error(codes.Unimplemented, "")
}
