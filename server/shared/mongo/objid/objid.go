package objid

import (
	"coolcar/shared/id"
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// FromID converts an id to objected id.
func FromID(id fmt.Stringer) (primitive.ObjectID, error) {
	return primitive.ObjectIDFromHex(id.String())
}

// MustFromID converts an id to objected id, panics on error.
func MustFromID(id fmt.Stringer) primitive.ObjectID {
	oid, err := FromID(id)
	if err != nil {
		panic(err)
	}
	return oid
}

// ToAccountID converts object id to account id.
func ToAccountID(oid primitive.ObjectID) id.AccountID {
	return id.AccountID(oid.Hex())
}

// ToTripID converts object id to trip id.
func ToTripID(oid primitive.ObjectID) id.TripID {
	return id.TripID(oid.Hex())
}
