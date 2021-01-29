package ai

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	coolenvpb "coolcar/shared/coolenv"
	"fmt"
)

// Client defines an AI client.
type Client struct {
	AIClient  coolenvpb.AIServiceClient
	UseRealAI bool
}

// DistanceKm calculates distance in km.
func (c *Client) DistanceKm(ctx context.Context, from *rentalpb.Location, to *rentalpb.Location) (float64, error) {
	resp, err := c.AIClient.MeasureDistance(ctx, &coolenvpb.MeasureDistanceRequest{
		From: &coolenvpb.Location{
			Latitude:  from.Latitude,
			Longitude: from.Longitude,
		},
		To: &coolenvpb.Location{
			Latitude:  to.Latitude,
			Longitude: to.Longitude,
		},
	})
	if err != nil {
		return 0, err
	}
	return resp.DistanceKm, nil
}

// Resolve resolves identity from given photo.
func (c *Client) Resolve(ctx context.Context, photo []byte) (*rentalpb.Identity, error) {
	i, err := c.AIClient.LicIdentity(ctx, &coolenvpb.IdentityRequest{
		Photo:  photo,
		RealAi: c.UseRealAI,
	})
	if err != nil {
		return nil, fmt.Errorf("cannot resolve identity: %v", err)
	}
	return &rentalpb.Identity{
		Name:            i.Name,
		Gender:          rentalpb.Gender(i.Gender),
		BirthDateMillis: i.BirthDateMillis,
		LicNumber:       i.LicNumber,
	}, nil
}
