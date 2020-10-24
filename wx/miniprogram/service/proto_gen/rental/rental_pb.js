import * as $protobuf from "protobufjs";

// Common aliases
const $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const rental = $root.rental = (() => {

    /**
     * Namespace rental.
     * @exports rental
     * @namespace
     */
    const rental = {};

    rental.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof rental
         * @namespace
         */
        const v1 = {};

        v1.Location = (function() {

            /**
             * Properties of a Location.
             * @memberof rental.v1
             * @interface ILocation
             * @property {number|null} [latitude] Location latitude
             * @property {number|null} [longitude] Location longitude
             */

            /**
             * Constructs a new Location.
             * @memberof rental.v1
             * @classdesc Represents a Location.
             * @implements ILocation
             * @constructor
             * @param {rental.v1.ILocation=} [properties] Properties to set
             */
            function Location(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Location latitude.
             * @member {number} latitude
             * @memberof rental.v1.Location
             * @instance
             */
            Location.prototype.latitude = 0;

            /**
             * Location longitude.
             * @member {number} longitude
             * @memberof rental.v1.Location
             * @instance
             */
            Location.prototype.longitude = 0;

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Location
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Location} Location
             */
            Location.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Location)
                    return object;
                let message = new $root.rental.v1.Location();
                if (object.latitude != null)
                    message.latitude = Number(object.latitude);
                if (object.longitude != null)
                    message.longitude = Number(object.longitude);
                return message;
            };

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Location
             * @static
             * @param {rental.v1.Location} message Location
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Location.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.latitude = 0;
                    object.longitude = 0;
                }
                if (message.latitude != null && message.hasOwnProperty("latitude"))
                    object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
                if (message.longitude != null && message.hasOwnProperty("longitude"))
                    object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
                return object;
            };

            /**
             * Converts this Location to JSON.
             * @function toJSON
             * @memberof rental.v1.Location
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Location.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Location;
        })();

        v1.LocationStatus = (function() {

            /**
             * Properties of a LocationStatus.
             * @memberof rental.v1
             * @interface ILocationStatus
             * @property {rental.v1.ILocation|null} [location] LocationStatus location
             * @property {number|null} [feeCent] LocationStatus feeCent
             * @property {number|null} [kmDriven] LocationStatus kmDriven
             * @property {string|null} [poiName] LocationStatus poiName
             * @property {number|null} [timestampSec] LocationStatus timestampSec
             */

            /**
             * Constructs a new LocationStatus.
             * @memberof rental.v1
             * @classdesc Represents a LocationStatus.
             * @implements ILocationStatus
             * @constructor
             * @param {rental.v1.ILocationStatus=} [properties] Properties to set
             */
            function LocationStatus(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LocationStatus location.
             * @member {rental.v1.ILocation|null|undefined} location
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.location = null;

            /**
             * LocationStatus feeCent.
             * @member {number} feeCent
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.feeCent = 0;

            /**
             * LocationStatus kmDriven.
             * @member {number} kmDriven
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.kmDriven = 0;

            /**
             * LocationStatus poiName.
             * @member {string} poiName
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.poiName = "";

            /**
             * LocationStatus timestampSec.
             * @member {number} timestampSec
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.timestampSec = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a LocationStatus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.LocationStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.LocationStatus} LocationStatus
             */
            LocationStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.LocationStatus)
                    return object;
                let message = new $root.rental.v1.LocationStatus();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".rental.v1.LocationStatus.location: object expected");
                    message.location = $root.rental.v1.Location.fromObject(object.location);
                }
                if (object.feeCent != null)
                    message.feeCent = object.feeCent | 0;
                if (object.kmDriven != null)
                    message.kmDriven = Number(object.kmDriven);
                if (object.poiName != null)
                    message.poiName = String(object.poiName);
                if (object.timestampSec != null)
                    if ($util.Long)
                        (message.timestampSec = $util.Long.fromValue(object.timestampSec)).unsigned = false;
                    else if (typeof object.timestampSec === "string")
                        message.timestampSec = parseInt(object.timestampSec, 10);
                    else if (typeof object.timestampSec === "number")
                        message.timestampSec = object.timestampSec;
                    else if (typeof object.timestampSec === "object")
                        message.timestampSec = new $util.LongBits(object.timestampSec.low >>> 0, object.timestampSec.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a LocationStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.LocationStatus
             * @static
             * @param {rental.v1.LocationStatus} message LocationStatus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LocationStatus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.location = null;
                    object.feeCent = 0;
                    object.kmDriven = 0;
                    object.poiName = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestampSec = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestampSec = options.longs === String ? "0" : 0;
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.rental.v1.Location.toObject(message.location, options);
                if (message.feeCent != null && message.hasOwnProperty("feeCent"))
                    object.feeCent = message.feeCent;
                if (message.kmDriven != null && message.hasOwnProperty("kmDriven"))
                    object.kmDriven = options.json && !isFinite(message.kmDriven) ? String(message.kmDriven) : message.kmDriven;
                if (message.poiName != null && message.hasOwnProperty("poiName"))
                    object.poiName = message.poiName;
                if (message.timestampSec != null && message.hasOwnProperty("timestampSec"))
                    if (typeof message.timestampSec === "number")
                        object.timestampSec = options.longs === String ? String(message.timestampSec) : message.timestampSec;
                    else
                        object.timestampSec = options.longs === String ? $util.Long.prototype.toString.call(message.timestampSec) : options.longs === Number ? new $util.LongBits(message.timestampSec.low >>> 0, message.timestampSec.high >>> 0).toNumber() : message.timestampSec;
                return object;
            };

            /**
             * Converts this LocationStatus to JSON.
             * @function toJSON
             * @memberof rental.v1.LocationStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LocationStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LocationStatus;
        })();

        /**
         * TripStatus enum.
         * @name rental.v1.TripStatus
         * @enum {number}
         * @property {number} TS_NOT_SPECIFIED=0 TS_NOT_SPECIFIED value
         * @property {number} IN_PROGRESS=1 IN_PROGRESS value
         * @property {number} FINISHED=2 FINISHED value
         */
        v1.TripStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "TS_NOT_SPECIFIED"] = 0;
            values[valuesById[1] = "IN_PROGRESS"] = 1;
            values[valuesById[2] = "FINISHED"] = 2;
            return values;
        })();

        v1.TripEntity = (function() {

            /**
             * Properties of a TripEntity.
             * @memberof rental.v1
             * @interface ITripEntity
             * @property {string|null} [id] TripEntity id
             * @property {rental.v1.ITrip|null} [trip] TripEntity trip
             */

            /**
             * Constructs a new TripEntity.
             * @memberof rental.v1
             * @classdesc Represents a TripEntity.
             * @implements ITripEntity
             * @constructor
             * @param {rental.v1.ITripEntity=} [properties] Properties to set
             */
            function TripEntity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TripEntity id.
             * @member {string} id
             * @memberof rental.v1.TripEntity
             * @instance
             */
            TripEntity.prototype.id = "";

            /**
             * TripEntity trip.
             * @member {rental.v1.ITrip|null|undefined} trip
             * @memberof rental.v1.TripEntity
             * @instance
             */
            TripEntity.prototype.trip = null;

            /**
             * Creates a TripEntity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.TripEntity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.TripEntity} TripEntity
             */
            TripEntity.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.TripEntity)
                    return object;
                let message = new $root.rental.v1.TripEntity();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.trip != null) {
                    if (typeof object.trip !== "object")
                        throw TypeError(".rental.v1.TripEntity.trip: object expected");
                    message.trip = $root.rental.v1.Trip.fromObject(object.trip);
                }
                return message;
            };

            /**
             * Creates a plain object from a TripEntity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.TripEntity
             * @static
             * @param {rental.v1.TripEntity} message TripEntity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TripEntity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.trip = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.trip != null && message.hasOwnProperty("trip"))
                    object.trip = $root.rental.v1.Trip.toObject(message.trip, options);
                return object;
            };

            /**
             * Converts this TripEntity to JSON.
             * @function toJSON
             * @memberof rental.v1.TripEntity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TripEntity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TripEntity;
        })();

        v1.Trip = (function() {

            /**
             * Properties of a Trip.
             * @memberof rental.v1
             * @interface ITrip
             * @property {string|null} [accountId] Trip accountId
             * @property {string|null} [carId] Trip carId
             * @property {rental.v1.ILocationStatus|null} [start] Trip start
             * @property {rental.v1.ILocationStatus|null} [current] Trip current
             * @property {rental.v1.ILocationStatus|null} [end] Trip end
             * @property {rental.v1.TripStatus|null} [status] Trip status
             * @property {string|null} [identityId] Trip identityId
             */

            /**
             * Constructs a new Trip.
             * @memberof rental.v1
             * @classdesc Represents a Trip.
             * @implements ITrip
             * @constructor
             * @param {rental.v1.ITrip=} [properties] Properties to set
             */
            function Trip(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Trip accountId.
             * @member {string} accountId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.accountId = "";

            /**
             * Trip carId.
             * @member {string} carId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.carId = "";

            /**
             * Trip start.
             * @member {rental.v1.ILocationStatus|null|undefined} start
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.start = null;

            /**
             * Trip current.
             * @member {rental.v1.ILocationStatus|null|undefined} current
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.current = null;

            /**
             * Trip end.
             * @member {rental.v1.ILocationStatus|null|undefined} end
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.end = null;

            /**
             * Trip status.
             * @member {rental.v1.TripStatus} status
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.status = 0;

            /**
             * Trip identityId.
             * @member {string} identityId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.identityId = "";

            /**
             * Creates a Trip message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Trip
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Trip} Trip
             */
            Trip.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Trip)
                    return object;
                let message = new $root.rental.v1.Trip();
                if (object.accountId != null)
                    message.accountId = String(object.accountId);
                if (object.carId != null)
                    message.carId = String(object.carId);
                if (object.start != null) {
                    if (typeof object.start !== "object")
                        throw TypeError(".rental.v1.Trip.start: object expected");
                    message.start = $root.rental.v1.LocationStatus.fromObject(object.start);
                }
                if (object.current != null) {
                    if (typeof object.current !== "object")
                        throw TypeError(".rental.v1.Trip.current: object expected");
                    message.current = $root.rental.v1.LocationStatus.fromObject(object.current);
                }
                if (object.end != null) {
                    if (typeof object.end !== "object")
                        throw TypeError(".rental.v1.Trip.end: object expected");
                    message.end = $root.rental.v1.LocationStatus.fromObject(object.end);
                }
                switch (object.status) {
                case "TS_NOT_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "IN_PROGRESS":
                case 1:
                    message.status = 1;
                    break;
                case "FINISHED":
                case 2:
                    message.status = 2;
                    break;
                }
                if (object.identityId != null)
                    message.identityId = String(object.identityId);
                return message;
            };

            /**
             * Creates a plain object from a Trip message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Trip
             * @static
             * @param {rental.v1.Trip} message Trip
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Trip.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.accountId = "";
                    object.carId = "";
                    object.start = null;
                    object.current = null;
                    object.end = null;
                    object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
                    object.identityId = "";
                }
                if (message.accountId != null && message.hasOwnProperty("accountId"))
                    object.accountId = message.accountId;
                if (message.carId != null && message.hasOwnProperty("carId"))
                    object.carId = message.carId;
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = $root.rental.v1.LocationStatus.toObject(message.start, options);
                if (message.current != null && message.hasOwnProperty("current"))
                    object.current = $root.rental.v1.LocationStatus.toObject(message.current, options);
                if (message.end != null && message.hasOwnProperty("end"))
                    object.end = $root.rental.v1.LocationStatus.toObject(message.end, options);
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.rental.v1.TripStatus[message.status] : message.status;
                if (message.identityId != null && message.hasOwnProperty("identityId"))
                    object.identityId = message.identityId;
                return object;
            };

            /**
             * Converts this Trip to JSON.
             * @function toJSON
             * @memberof rental.v1.Trip
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Trip.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Trip;
        })();

        v1.CreateTripRequest = (function() {

            /**
             * Properties of a CreateTripRequest.
             * @memberof rental.v1
             * @interface ICreateTripRequest
             * @property {rental.v1.ILocation|null} [start] CreateTripRequest start
             * @property {string|null} [carId] CreateTripRequest carId
             */

            /**
             * Constructs a new CreateTripRequest.
             * @memberof rental.v1
             * @classdesc Represents a CreateTripRequest.
             * @implements ICreateTripRequest
             * @constructor
             * @param {rental.v1.ICreateTripRequest=} [properties] Properties to set
             */
            function CreateTripRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateTripRequest start.
             * @member {rental.v1.ILocation|null|undefined} start
             * @memberof rental.v1.CreateTripRequest
             * @instance
             */
            CreateTripRequest.prototype.start = null;

            /**
             * CreateTripRequest carId.
             * @member {string} carId
             * @memberof rental.v1.CreateTripRequest
             * @instance
             */
            CreateTripRequest.prototype.carId = "";

            /**
             * Creates a CreateTripRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.CreateTripRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.CreateTripRequest} CreateTripRequest
             */
            CreateTripRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.CreateTripRequest)
                    return object;
                let message = new $root.rental.v1.CreateTripRequest();
                if (object.start != null) {
                    if (typeof object.start !== "object")
                        throw TypeError(".rental.v1.CreateTripRequest.start: object expected");
                    message.start = $root.rental.v1.Location.fromObject(object.start);
                }
                if (object.carId != null)
                    message.carId = String(object.carId);
                return message;
            };

            /**
             * Creates a plain object from a CreateTripRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.CreateTripRequest
             * @static
             * @param {rental.v1.CreateTripRequest} message CreateTripRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateTripRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.start = null;
                    object.carId = "";
                }
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = $root.rental.v1.Location.toObject(message.start, options);
                if (message.carId != null && message.hasOwnProperty("carId"))
                    object.carId = message.carId;
                return object;
            };

            /**
             * Converts this CreateTripRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.CreateTripRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateTripRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateTripRequest;
        })();

        v1.GetTripRequest = (function() {

            /**
             * Properties of a GetTripRequest.
             * @memberof rental.v1
             * @interface IGetTripRequest
             * @property {string|null} [id] GetTripRequest id
             */

            /**
             * Constructs a new GetTripRequest.
             * @memberof rental.v1
             * @classdesc Represents a GetTripRequest.
             * @implements IGetTripRequest
             * @constructor
             * @param {rental.v1.IGetTripRequest=} [properties] Properties to set
             */
            function GetTripRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripRequest id.
             * @member {string} id
             * @memberof rental.v1.GetTripRequest
             * @instance
             */
            GetTripRequest.prototype.id = "";

            /**
             * Creates a GetTripRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripRequest} GetTripRequest
             */
            GetTripRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripRequest)
                    return object;
                let message = new $root.rental.v1.GetTripRequest();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a GetTripRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripRequest
             * @static
             * @param {rental.v1.GetTripRequest} message GetTripRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.id = "";
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this GetTripRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripRequest;
        })();

        v1.GetTripsRequest = (function() {

            /**
             * Properties of a GetTripsRequest.
             * @memberof rental.v1
             * @interface IGetTripsRequest
             * @property {rental.v1.TripStatus|null} [status] GetTripsRequest status
             */

            /**
             * Constructs a new GetTripsRequest.
             * @memberof rental.v1
             * @classdesc Represents a GetTripsRequest.
             * @implements IGetTripsRequest
             * @constructor
             * @param {rental.v1.IGetTripsRequest=} [properties] Properties to set
             */
            function GetTripsRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripsRequest status.
             * @member {rental.v1.TripStatus} status
             * @memberof rental.v1.GetTripsRequest
             * @instance
             */
            GetTripsRequest.prototype.status = 0;

            /**
             * Creates a GetTripsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripsRequest} GetTripsRequest
             */
            GetTripsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripsRequest)
                    return object;
                let message = new $root.rental.v1.GetTripsRequest();
                switch (object.status) {
                case "TS_NOT_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "IN_PROGRESS":
                case 1:
                    message.status = 1;
                    break;
                case "FINISHED":
                case 2:
                    message.status = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTripsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripsRequest
             * @static
             * @param {rental.v1.GetTripsRequest} message GetTripsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripsRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.rental.v1.TripStatus[message.status] : message.status;
                return object;
            };

            /**
             * Converts this GetTripsRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripsRequest;
        })();

        v1.GetTripsResponse = (function() {

            /**
             * Properties of a GetTripsResponse.
             * @memberof rental.v1
             * @interface IGetTripsResponse
             * @property {Array.<rental.v1.ITripEntity>|null} [trips] GetTripsResponse trips
             */

            /**
             * Constructs a new GetTripsResponse.
             * @memberof rental.v1
             * @classdesc Represents a GetTripsResponse.
             * @implements IGetTripsResponse
             * @constructor
             * @param {rental.v1.IGetTripsResponse=} [properties] Properties to set
             */
            function GetTripsResponse(properties) {
                this.trips = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripsResponse trips.
             * @member {Array.<rental.v1.ITripEntity>} trips
             * @memberof rental.v1.GetTripsResponse
             * @instance
             */
            GetTripsResponse.prototype.trips = $util.emptyArray;

            /**
             * Creates a GetTripsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripsResponse} GetTripsResponse
             */
            GetTripsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripsResponse)
                    return object;
                let message = new $root.rental.v1.GetTripsResponse();
                if (object.trips) {
                    if (!Array.isArray(object.trips))
                        throw TypeError(".rental.v1.GetTripsResponse.trips: array expected");
                    message.trips = [];
                    for (let i = 0; i < object.trips.length; ++i) {
                        if (typeof object.trips[i] !== "object")
                            throw TypeError(".rental.v1.GetTripsResponse.trips: object expected");
                        message.trips[i] = $root.rental.v1.TripEntity.fromObject(object.trips[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTripsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripsResponse
             * @static
             * @param {rental.v1.GetTripsResponse} message GetTripsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.trips = [];
                if (message.trips && message.trips.length) {
                    object.trips = [];
                    for (let j = 0; j < message.trips.length; ++j)
                        object.trips[j] = $root.rental.v1.TripEntity.toObject(message.trips[j], options);
                }
                return object;
            };

            /**
             * Converts this GetTripsResponse to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripsResponse;
        })();

        v1.UpdateTripRequest = (function() {

            /**
             * Properties of an UpdateTripRequest.
             * @memberof rental.v1
             * @interface IUpdateTripRequest
             * @property {string|null} [id] UpdateTripRequest id
             * @property {rental.v1.ILocation|null} [current] UpdateTripRequest current
             * @property {boolean|null} [endTrip] UpdateTripRequest endTrip
             */

            /**
             * Constructs a new UpdateTripRequest.
             * @memberof rental.v1
             * @classdesc Represents an UpdateTripRequest.
             * @implements IUpdateTripRequest
             * @constructor
             * @param {rental.v1.IUpdateTripRequest=} [properties] Properties to set
             */
            function UpdateTripRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UpdateTripRequest id.
             * @member {string} id
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             */
            UpdateTripRequest.prototype.id = "";

            /**
             * UpdateTripRequest current.
             * @member {rental.v1.ILocation|null|undefined} current
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             */
            UpdateTripRequest.prototype.current = null;

            /**
             * UpdateTripRequest endTrip.
             * @member {boolean} endTrip
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             */
            UpdateTripRequest.prototype.endTrip = false;

            /**
             * Creates an UpdateTripRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.UpdateTripRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.UpdateTripRequest} UpdateTripRequest
             */
            UpdateTripRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.UpdateTripRequest)
                    return object;
                let message = new $root.rental.v1.UpdateTripRequest();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.current != null) {
                    if (typeof object.current !== "object")
                        throw TypeError(".rental.v1.UpdateTripRequest.current: object expected");
                    message.current = $root.rental.v1.Location.fromObject(object.current);
                }
                if (object.endTrip != null)
                    message.endTrip = Boolean(object.endTrip);
                return message;
            };

            /**
             * Creates a plain object from an UpdateTripRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.UpdateTripRequest
             * @static
             * @param {rental.v1.UpdateTripRequest} message UpdateTripRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateTripRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.current = null;
                    object.endTrip = false;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.current != null && message.hasOwnProperty("current"))
                    object.current = $root.rental.v1.Location.toObject(message.current, options);
                if (message.endTrip != null && message.hasOwnProperty("endTrip"))
                    object.endTrip = message.endTrip;
                return object;
            };

            /**
             * Converts this UpdateTripRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.UpdateTripRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateTripRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateTripRequest;
        })();

        v1.TripService = (function() {

            /**
             * Constructs a new TripService service.
             * @memberof rental.v1
             * @classdesc Represents a TripService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function TripService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (TripService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = TripService;

            /**
             * Callback as used by {@link rental.v1.TripService#createTrip}.
             * @memberof rental.v1.TripService
             * @typedef CreateTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.TripEntity} [response] TripEntity
             */

            /**
             * Calls CreateTrip.
             * @function createTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.ICreateTripRequest} request CreateTripRequest message or plain object
             * @param {rental.v1.TripService.CreateTripCallback} callback Node-style callback called with the error, if any, and TripEntity
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.createTrip = function createTrip(request, callback) {
                return this.rpcCall(createTrip, $root.rental.v1.CreateTripRequest, $root.rental.v1.TripEntity, request, callback);
            }, "name", { value: "CreateTrip" });

            /**
             * Calls CreateTrip.
             * @function createTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.ICreateTripRequest} request CreateTripRequest message or plain object
             * @returns {Promise<rental.v1.TripEntity>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#getTrip}.
             * @memberof rental.v1.TripService
             * @typedef GetTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Trip} [response] Trip
             */

            /**
             * Calls GetTrip.
             * @function getTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripRequest} request GetTripRequest message or plain object
             * @param {rental.v1.TripService.GetTripCallback} callback Node-style callback called with the error, if any, and Trip
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.getTrip = function getTrip(request, callback) {
                return this.rpcCall(getTrip, $root.rental.v1.GetTripRequest, $root.rental.v1.Trip, request, callback);
            }, "name", { value: "GetTrip" });

            /**
             * Calls GetTrip.
             * @function getTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripRequest} request GetTripRequest message or plain object
             * @returns {Promise<rental.v1.Trip>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#getTrips}.
             * @memberof rental.v1.TripService
             * @typedef GetTripsCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.GetTripsResponse} [response] GetTripsResponse
             */

            /**
             * Calls GetTrips.
             * @function getTrips
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripsRequest} request GetTripsRequest message or plain object
             * @param {rental.v1.TripService.GetTripsCallback} callback Node-style callback called with the error, if any, and GetTripsResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.getTrips = function getTrips(request, callback) {
                return this.rpcCall(getTrips, $root.rental.v1.GetTripsRequest, $root.rental.v1.GetTripsResponse, request, callback);
            }, "name", { value: "GetTrips" });

            /**
             * Calls GetTrips.
             * @function getTrips
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripsRequest} request GetTripsRequest message or plain object
             * @returns {Promise<rental.v1.GetTripsResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#updateTrip}.
             * @memberof rental.v1.TripService
             * @typedef UpdateTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Trip} [response] Trip
             */

            /**
             * Calls UpdateTrip.
             * @function updateTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IUpdateTripRequest} request UpdateTripRequest message or plain object
             * @param {rental.v1.TripService.UpdateTripCallback} callback Node-style callback called with the error, if any, and Trip
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.updateTrip = function updateTrip(request, callback) {
                return this.rpcCall(updateTrip, $root.rental.v1.UpdateTripRequest, $root.rental.v1.Trip, request, callback);
            }, "name", { value: "UpdateTrip" });

            /**
             * Calls UpdateTrip.
             * @function updateTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IUpdateTripRequest} request UpdateTripRequest message or plain object
             * @returns {Promise<rental.v1.Trip>} Promise
             * @variation 2
             */

            return TripService;
        })();

        /**
         * Gender enum.
         * @name rental.v1.Gender
         * @enum {number}
         * @property {number} G_NOT_SPECIFIED=0 G_NOT_SPECIFIED value
         * @property {number} MALE=1 MALE value
         * @property {number} FEMALE=2 FEMALE value
         */
        v1.Gender = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "G_NOT_SPECIFIED"] = 0;
            values[valuesById[1] = "MALE"] = 1;
            values[valuesById[2] = "FEMALE"] = 2;
            return values;
        })();

        /**
         * IdentityStatus enum.
         * @name rental.v1.IdentityStatus
         * @enum {number}
         * @property {number} UNSUBMITTED=0 UNSUBMITTED value
         * @property {number} PENDING=1 PENDING value
         * @property {number} VERIFIED=2 VERIFIED value
         */
        v1.IdentityStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNSUBMITTED"] = 0;
            values[valuesById[1] = "PENDING"] = 1;
            values[valuesById[2] = "VERIFIED"] = 2;
            return values;
        })();

        v1.Profile = (function() {

            /**
             * Properties of a Profile.
             * @memberof rental.v1
             * @interface IProfile
             * @property {rental.v1.IIdentity|null} [identity] Profile identity
             * @property {rental.v1.IdentityStatus|null} [identityStatus] Profile identityStatus
             */

            /**
             * Constructs a new Profile.
             * @memberof rental.v1
             * @classdesc Represents a Profile.
             * @implements IProfile
             * @constructor
             * @param {rental.v1.IProfile=} [properties] Properties to set
             */
            function Profile(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Profile identity.
             * @member {rental.v1.IIdentity|null|undefined} identity
             * @memberof rental.v1.Profile
             * @instance
             */
            Profile.prototype.identity = null;

            /**
             * Profile identityStatus.
             * @member {rental.v1.IdentityStatus} identityStatus
             * @memberof rental.v1.Profile
             * @instance
             */
            Profile.prototype.identityStatus = 0;

            /**
             * Creates a Profile message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Profile
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Profile} Profile
             */
            Profile.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Profile)
                    return object;
                let message = new $root.rental.v1.Profile();
                if (object.identity != null) {
                    if (typeof object.identity !== "object")
                        throw TypeError(".rental.v1.Profile.identity: object expected");
                    message.identity = $root.rental.v1.Identity.fromObject(object.identity);
                }
                switch (object.identityStatus) {
                case "UNSUBMITTED":
                case 0:
                    message.identityStatus = 0;
                    break;
                case "PENDING":
                case 1:
                    message.identityStatus = 1;
                    break;
                case "VERIFIED":
                case 2:
                    message.identityStatus = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a Profile message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Profile
             * @static
             * @param {rental.v1.Profile} message Profile
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Profile.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.identity = null;
                    object.identityStatus = options.enums === String ? "UNSUBMITTED" : 0;
                }
                if (message.identity != null && message.hasOwnProperty("identity"))
                    object.identity = $root.rental.v1.Identity.toObject(message.identity, options);
                if (message.identityStatus != null && message.hasOwnProperty("identityStatus"))
                    object.identityStatus = options.enums === String ? $root.rental.v1.IdentityStatus[message.identityStatus] : message.identityStatus;
                return object;
            };

            /**
             * Converts this Profile to JSON.
             * @function toJSON
             * @memberof rental.v1.Profile
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Profile.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Profile;
        })();

        v1.Identity = (function() {

            /**
             * Properties of an Identity.
             * @memberof rental.v1
             * @interface IIdentity
             * @property {string|null} [licNumber] Identity licNumber
             * @property {string|null} [name] Identity name
             * @property {rental.v1.Gender|null} [gender] Identity gender
             * @property {number|null} [birthDateMillis] Identity birthDateMillis
             */

            /**
             * Constructs a new Identity.
             * @memberof rental.v1
             * @classdesc Represents an Identity.
             * @implements IIdentity
             * @constructor
             * @param {rental.v1.IIdentity=} [properties] Properties to set
             */
            function Identity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Identity licNumber.
             * @member {string} licNumber
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.licNumber = "";

            /**
             * Identity name.
             * @member {string} name
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.name = "";

            /**
             * Identity gender.
             * @member {rental.v1.Gender} gender
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.gender = 0;

            /**
             * Identity birthDateMillis.
             * @member {number} birthDateMillis
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.birthDateMillis = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates an Identity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Identity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Identity} Identity
             */
            Identity.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Identity)
                    return object;
                let message = new $root.rental.v1.Identity();
                if (object.licNumber != null)
                    message.licNumber = String(object.licNumber);
                if (object.name != null)
                    message.name = String(object.name);
                switch (object.gender) {
                case "G_NOT_SPECIFIED":
                case 0:
                    message.gender = 0;
                    break;
                case "MALE":
                case 1:
                    message.gender = 1;
                    break;
                case "FEMALE":
                case 2:
                    message.gender = 2;
                    break;
                }
                if (object.birthDateMillis != null)
                    if ($util.Long)
                        (message.birthDateMillis = $util.Long.fromValue(object.birthDateMillis)).unsigned = false;
                    else if (typeof object.birthDateMillis === "string")
                        message.birthDateMillis = parseInt(object.birthDateMillis, 10);
                    else if (typeof object.birthDateMillis === "number")
                        message.birthDateMillis = object.birthDateMillis;
                    else if (typeof object.birthDateMillis === "object")
                        message.birthDateMillis = new $util.LongBits(object.birthDateMillis.low >>> 0, object.birthDateMillis.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an Identity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Identity
             * @static
             * @param {rental.v1.Identity} message Identity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Identity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.licNumber = "";
                    object.name = "";
                    object.gender = options.enums === String ? "G_NOT_SPECIFIED" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.birthDateMillis = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.birthDateMillis = options.longs === String ? "0" : 0;
                }
                if (message.licNumber != null && message.hasOwnProperty("licNumber"))
                    object.licNumber = message.licNumber;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.gender != null && message.hasOwnProperty("gender"))
                    object.gender = options.enums === String ? $root.rental.v1.Gender[message.gender] : message.gender;
                if (message.birthDateMillis != null && message.hasOwnProperty("birthDateMillis"))
                    if (typeof message.birthDateMillis === "number")
                        object.birthDateMillis = options.longs === String ? String(message.birthDateMillis) : message.birthDateMillis;
                    else
                        object.birthDateMillis = options.longs === String ? $util.Long.prototype.toString.call(message.birthDateMillis) : options.longs === Number ? new $util.LongBits(message.birthDateMillis.low >>> 0, message.birthDateMillis.high >>> 0).toNumber() : message.birthDateMillis;
                return object;
            };

            /**
             * Converts this Identity to JSON.
             * @function toJSON
             * @memberof rental.v1.Identity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Identity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Identity;
        })();

        v1.GetProfileRequest = (function() {

            /**
             * Properties of a GetProfileRequest.
             * @memberof rental.v1
             * @interface IGetProfileRequest
             */

            /**
             * Constructs a new GetProfileRequest.
             * @memberof rental.v1
             * @classdesc Represents a GetProfileRequest.
             * @implements IGetProfileRequest
             * @constructor
             * @param {rental.v1.IGetProfileRequest=} [properties] Properties to set
             */
            function GetProfileRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a GetProfileRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetProfileRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetProfileRequest} GetProfileRequest
             */
            GetProfileRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetProfileRequest)
                    return object;
                return new $root.rental.v1.GetProfileRequest();
            };

            /**
             * Creates a plain object from a GetProfileRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetProfileRequest
             * @static
             * @param {rental.v1.GetProfileRequest} message GetProfileRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetProfileRequest.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetProfileRequest to JSON.
             * @function toJSON
             * @memberof rental.v1.GetProfileRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetProfileRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetProfileRequest;
        })();

        v1.UpdateProfileResponse = (function() {

            /**
             * Properties of an UpdateProfileResponse.
             * @memberof rental.v1
             * @interface IUpdateProfileResponse
             */

            /**
             * Constructs a new UpdateProfileResponse.
             * @memberof rental.v1
             * @classdesc Represents an UpdateProfileResponse.
             * @implements IUpdateProfileResponse
             * @constructor
             * @param {rental.v1.IUpdateProfileResponse=} [properties] Properties to set
             */
            function UpdateProfileResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates an UpdateProfileResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.UpdateProfileResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.UpdateProfileResponse} UpdateProfileResponse
             */
            UpdateProfileResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.UpdateProfileResponse)
                    return object;
                return new $root.rental.v1.UpdateProfileResponse();
            };

            /**
             * Creates a plain object from an UpdateProfileResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.UpdateProfileResponse
             * @static
             * @param {rental.v1.UpdateProfileResponse} message UpdateProfileResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateProfileResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this UpdateProfileResponse to JSON.
             * @function toJSON
             * @memberof rental.v1.UpdateProfileResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateProfileResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateProfileResponse;
        })();

        v1.ProfileService = (function() {

            /**
             * Constructs a new ProfileService service.
             * @memberof rental.v1
             * @classdesc Represents a ProfileService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function ProfileService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (ProfileService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = ProfileService;

            /**
             * Callback as used by {@link rental.v1.ProfileService#getProfile}.
             * @memberof rental.v1.ProfileService
             * @typedef GetProfileCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Profile} [response] Profile
             */

            /**
             * Calls GetProfile.
             * @function getProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IGetProfileRequest} request GetProfileRequest message or plain object
             * @param {rental.v1.ProfileService.GetProfileCallback} callback Node-style callback called with the error, if any, and Profile
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.getProfile = function getProfile(request, callback) {
                return this.rpcCall(getProfile, $root.rental.v1.GetProfileRequest, $root.rental.v1.Profile, request, callback);
            }, "name", { value: "GetProfile" });

            /**
             * Calls GetProfile.
             * @function getProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IGetProfileRequest} request GetProfileRequest message or plain object
             * @returns {Promise<rental.v1.Profile>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#updateProfile}.
             * @memberof rental.v1.ProfileService
             * @typedef UpdateProfileCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.UpdateProfileResponse} [response] UpdateProfileResponse
             */

            /**
             * Calls UpdateProfile.
             * @function updateProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IProfile} request Profile message or plain object
             * @param {rental.v1.ProfileService.UpdateProfileCallback} callback Node-style callback called with the error, if any, and UpdateProfileResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.updateProfile = function updateProfile(request, callback) {
                return this.rpcCall(updateProfile, $root.rental.v1.Profile, $root.rental.v1.UpdateProfileResponse, request, callback);
            }, "name", { value: "UpdateProfile" });

            /**
             * Calls UpdateProfile.
             * @function updateProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IProfile} request Profile message or plain object
             * @returns {Promise<rental.v1.UpdateProfileResponse>} Promise
             * @variation 2
             */

            return ProfileService;
        })();

        return v1;
    })();

    return rental;
})();