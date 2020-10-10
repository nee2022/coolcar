package id

// AccountID defines account id object.
type AccountID string

func (a AccountID) String() string {
	return string(a)
}

// TripID defines trip id object.
type TripID string

func (t TripID) String() string {
	return string(t)
}
