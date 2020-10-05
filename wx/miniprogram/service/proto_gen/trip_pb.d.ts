import * as $protobuf from "protobufjs";
/** Namespace coolcar. */
export namespace coolcar {

    /** Properties of a Location. */
    interface ILocation {

        /** Location latitude */
        latitude?: (number|null);

        /** Location longitude */
        longitude?: (number|null);
    }

    /** Represents a Location. */
    class Location implements ILocation {

        /**
         * Constructs a new Location.
         * @param [properties] Properties to set
         */
        constructor(properties?: coolcar.ILocation);

        /** Location latitude. */
        public latitude: number;

        /** Location longitude. */
        public longitude: number;

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Location
         */
        public static fromObject(object: { [k: string]: any }): coolcar.Location;

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @param message Location
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: coolcar.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Location to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** TripStatus enum. */
    enum TripStatus {
        TS_NOT_SPECIFIED = 0,
        NOT_STARTED = 1,
        IN_PROGRESS = 2,
        FINISHED = 3,
        PAID = 4
    }

    /** Properties of a Trip. */
    interface ITrip {

        /** Trip start */
        start?: (string|null);

        /** Trip startPos */
        startPos?: (coolcar.ILocation|null);

        /** Trip pathLocations */
        pathLocations?: (coolcar.ILocation[]|null);

        /** Trip end */
        end?: (string|null);

        /** Trip endPos */
        endPos?: (coolcar.ILocation|null);

        /** Trip durationSec */
        durationSec?: (number|null);

        /** Trip feeCent */
        feeCent?: (number|null);

        /** Trip status */
        status?: (coolcar.TripStatus|null);
    }

    /** Represents a Trip. */
    class Trip implements ITrip {

        /**
         * Constructs a new Trip.
         * @param [properties] Properties to set
         */
        constructor(properties?: coolcar.ITrip);

        /** Trip start. */
        public start: string;

        /** Trip startPos. */
        public startPos?: (coolcar.ILocation|null);

        /** Trip pathLocations. */
        public pathLocations: coolcar.ILocation[];

        /** Trip end. */
        public end: string;

        /** Trip endPos. */
        public endPos?: (coolcar.ILocation|null);

        /** Trip durationSec. */
        public durationSec: number;

        /** Trip feeCent. */
        public feeCent: number;

        /** Trip status. */
        public status: coolcar.TripStatus;

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Trip
         */
        public static fromObject(object: { [k: string]: any }): coolcar.Trip;

        /**
         * Creates a plain object from a Trip message. Also converts values to other types if specified.
         * @param message Trip
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: coolcar.Trip, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Trip to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetTripRequest. */
    interface IGetTripRequest {

        /** GetTripRequest id */
        id?: (string|null);
    }

    /** Represents a GetTripRequest. */
    class GetTripRequest implements IGetTripRequest {

        /**
         * Constructs a new GetTripRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: coolcar.IGetTripRequest);

        /** GetTripRequest id. */
        public id: string;

        /**
         * Creates a GetTripRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetTripRequest
         */
        public static fromObject(object: { [k: string]: any }): coolcar.GetTripRequest;

        /**
         * Creates a plain object from a GetTripRequest message. Also converts values to other types if specified.
         * @param message GetTripRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: coolcar.GetTripRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetTripRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetTripResponse. */
    interface IGetTripResponse {

        /** GetTripResponse id */
        id?: (string|null);

        /** GetTripResponse trip */
        trip?: (coolcar.ITrip|null);
    }

    /** Represents a GetTripResponse. */
    class GetTripResponse implements IGetTripResponse {

        /**
         * Constructs a new GetTripResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: coolcar.IGetTripResponse);

        /** GetTripResponse id. */
        public id: string;

        /** GetTripResponse trip. */
        public trip?: (coolcar.ITrip|null);

        /**
         * Creates a GetTripResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetTripResponse
         */
        public static fromObject(object: { [k: string]: any }): coolcar.GetTripResponse;

        /**
         * Creates a plain object from a GetTripResponse message. Also converts values to other types if specified.
         * @param message GetTripResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: coolcar.GetTripResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetTripResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents a TripService */
    class TripService extends $protobuf.rpc.Service {

        /**
         * Constructs a new TripService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Calls GetTrip.
         * @param request GetTripRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and GetTripResponse
         */
        public getTrip(request: coolcar.IGetTripRequest, callback: coolcar.TripService.GetTripCallback): void;

        /**
         * Calls GetTrip.
         * @param request GetTripRequest message or plain object
         * @returns Promise
         */
        public getTrip(request: coolcar.IGetTripRequest): Promise<coolcar.GetTripResponse>;
    }

    namespace TripService {

        /**
         * Callback as used by {@link coolcar.TripService#getTrip}.
         * @param error Error, if any
         * @param [response] GetTripResponse
         */
        type GetTripCallback = (error: (Error|null), response?: coolcar.GetTripResponse) => void;
    }
}
