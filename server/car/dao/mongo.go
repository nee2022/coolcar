package dao

import (
	"context"
	carpb "coolcar/car/api/gen/v1"
	"coolcar/shared/id"
	mgutil "coolcar/shared/mongo"
	"coolcar/shared/mongo/objid"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	carField      = "car"
	statusField   = carField + ".status"
	driverField   = carField + ".driver"
	positionField = carField + ".position"
	tripIDField   = carField + ".tripid"
)

// Mongo defines a mongo dao.
type Mongo struct {
	col *mongo.Collection
}

// NewMongo creates a mongo dao.
func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection("car"),
	}
}

// CarRecord defines a car record in mongo db.
type CarRecord struct {
	mgutil.IDField `bson:"inline"`
	Car            *carpb.Car `bson:"car"`
}

// CreateCar creates a car.
func (m *Mongo) CreateCar(c context.Context) (*CarRecord, error) {
	r := &CarRecord{
		Car: &carpb.Car{
			Position: &carpb.Location{
				Latitude:  30,
				Longitude: 120,
			},
			Status: carpb.CarStatus_LOCKED,
		},
	}
	r.ID = mgutil.NewObjID()
	_, err := m.col.InsertOne(c, r)
	if err != nil {
		return nil, err
	}
	return r, nil
}

// GetCar gets a car.
func (m *Mongo) GetCar(c context.Context, id id.CarID) (*CarRecord, error) {
	objID, err := objid.FromID(id)
	if err != nil {
		return nil, fmt.Errorf("invalid id: %v", err)
	}
	return convertSingleResult(m.col.FindOne(c, bson.M{
		mgutil.IDFieldName: objID,
	}))
}

// GetCars gets cars.
func (m *Mongo) GetCars(c context.Context) ([]*CarRecord, error) {
	filter := bson.M{}
	res, err := m.col.Find(c, filter, options.Find())
	if err != nil {
		return nil, err
	}

	var cars []*CarRecord
	for res.Next(c) {
		var car CarRecord
		err := res.Decode(&car)
		if err != nil {
			return nil, err
		}
		cars = append(cars, &car)
	}
	return cars, nil
}

// CarUpdate defines updates to a car.
// Only specified fields will be updated.
type CarUpdate struct {
	Status       carpb.CarStatus
	Position     *carpb.Location
	Driver       *carpb.Driver
	UpdateTripID bool
	TripID       id.TripID
}

// UpdateCar updates a car. If status is specified,
// it updates the car only when existing record matches the
// status specified.
func (m *Mongo) UpdateCar(c context.Context, id id.CarID, status carpb.CarStatus, update *CarUpdate) (*CarRecord, error) {
	objID, err := objid.FromID(id)
	if err != nil {
		return nil, fmt.Errorf("invalid id: %v", err)
	}

	filter := bson.M{
		mgutil.IDFieldName: objID,
	}
	if status != carpb.CarStatus_CS_NOT_SPECIFIED {
		filter[statusField] = status
	}

	u := bson.M{}
	if update.Status != carpb.CarStatus_CS_NOT_SPECIFIED {
		u[statusField] = update.Status
	}
	if update.Driver != nil {
		u[driverField] = update.Driver
	}
	if update.Position != nil {
		u[positionField] = update.Position
	}
	if update.UpdateTripID {
		u[tripIDField] = update.TripID.String()
	}

	res := m.col.FindOneAndUpdate(c, filter, mgutil.Set(u),
		options.FindOneAndUpdate().SetReturnDocument(options.After))
	return convertSingleResult(res)
}

func convertSingleResult(res *mongo.SingleResult) (*CarRecord, error) {
	if err := res.Err(); err != nil {
		return nil, err
	}

	var cr CarRecord
	err := res.Decode(&cr)
	if err != nil {
		return nil, fmt.Errorf("cannot decode: %v", err)
	}
	return &cr, nil
}
