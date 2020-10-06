package dao

import (
	"context"
	mgo "coolcar/shared/mongo"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const openIDField = "open_id"

// Mongo defines a mongo dao.
type Mongo struct {
	col *mongo.Collection
}

// NewMongo creates a mongo dao.
func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection("account"),
	}
}

// ResolveAccountID resolves the account id from open id.
func (m *Mongo) ResolveAccountID(
	c context.Context, openID string) (string, error) {

	res := m.col.FindOneAndUpdate(c, bson.M{
		openIDField: openID,
	}, mgo.Set(bson.M{
		openIDField: openID,
	}), options.FindOneAndUpdate().
		SetUpsert(true).
		SetReturnDocument(options.After))

	if err := res.Err(); err != nil {
		return "", fmt.Errorf("cannot findOneAndUpdate: %v", err)
	}

	var row mgo.ObjID
	err := res.Decode(&row)
	if err != nil {
		return "", fmt.Errorf("cannot decode result: %v", err)
	}

	return row.ID.Hex(), nil
}
