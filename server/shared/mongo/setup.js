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