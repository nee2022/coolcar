use coolcar

db.account.createIndex({
    open_id: 1,
},{
    unique: true,
})

db.trip.createIndex({
    "trip.accountid": 1,
    "trip.status": 1,
}, {
    unique: true,
    partialFilterExpression: {
        "trip.status": 1,
    }
})

db.profile.createIndex({
    "accountid": 1,
}, {
    unique: true,
})

db.car.insertMany([
  {
    "_id": ObjectId("60af01e5a21ead3dccbcd1d8"),
    "car": {
      "status": 1,
      "position": {
        "latitude": 30,
        "longitude": 120
      },
    }
  },
  {
    "_id": ObjectId("60af01e5a21ead3dccbcd1d9"),
    "car": {
      "status": 1,
      "position": {
        "latitude": 30,
        "longitude": 120
      },
    }
  },
  {
    "_id": ObjectId("60af01e5a21ead3dccbcd1da"),
    "car": {
      "status": 1,
      "position": {
        "latitude": 30,
        "longitude": 120
      },
    }
  },
  {
    "_id": ObjectId("60af01e5a21ead3dccbcd1db"),
    "car": {
      "status": 1,
      "position": {
        "latitude": 30,
        "longitude": 120
      },
    }
  },
  {
    "_id": ObjectId("60af01e5a21ead3dccbcd1dc"),
    "car": {
      "status": 1,
      "position": {
        "latitude": 30,
        "longitude": 120
      },
    }
  },
])
