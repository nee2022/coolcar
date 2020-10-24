package car

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/id"
)

// Manager defines a car manager.
type Manager struct {
}

// Verify verifies car status.
func (c *Manager) Verify(context.Context, id.CarID, *rentalpb.Location) error {
	return nil
}

// Unlock unlocks a car.
func (c *Manager) Unlock(context.Context, id.CarID) error {
	return nil
}
