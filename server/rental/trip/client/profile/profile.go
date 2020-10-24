package profile

import (
	"context"
	"coolcar/shared/id"
)

// Manager defines a profile manager.
type Manager struct {
}

// Verify verifies account identity.
func (p *Manager) Verify(context.Context, id.AccountID) (id.IdentityID, error) {
	return id.IdentityID("identity1"), nil
}
