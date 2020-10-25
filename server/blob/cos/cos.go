package cos

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"

	"github.com/tencentyun/cos-go-sdk-v5"
)

// Service defines a cos service.
type Service struct {
	client *cos.Client
	secID  string
	secKey string
}

// NewService creates a cos service.
func NewService(addr, secID, secKey string) (*Service, error) {
	u, err := url.Parse(addr)
	if err != nil {
		return nil, fmt.Errorf("cannot parse addr: %v", err)
	}
	b := &cos.BaseURL{BucketURL: u}

	return &Service{
		client: cos.NewClient(b, &http.Client{
			Transport: &cos.AuthorizationTransport{
				SecretID:  secID,
				SecretKey: secKey,
			},
		}),
		secID:  secID,
		secKey: secKey,
	}, nil
}

// SignURL signs a url.
func (s *Service) SignURL(c context.Context, method, path string, timeout time.Duration) (string, error) {
	u, err := s.client.Object.GetPresignedURL(
		c, method, path, s.secID,
		s.secKey, timeout, nil)
	if err != nil {
		return "", err
	}
	return u.String(), nil
}

// Get gets storage contents.
func (s *Service) Get(c context.Context, path string) (io.ReadCloser, error) {
	res, err := s.client.Object.Get(c, path, nil)
	var b io.ReadCloser
	if res != nil {
		b = res.Body
	}
	if err != nil {
		return b, err
	}
	if res.StatusCode >= 400 {
		return b, fmt.Errorf("got err response: %+v", res)
	}
	return b, nil
}
