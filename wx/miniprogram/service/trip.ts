import { rental } from "./proto_gen/rental/rental_pb";
import { Coolcar } from "./request";

export namespace TripService {
    export function CreateTrip(req: rental.v1.ICreateTripRequest): Promise<rental.v1.ITripEntity> {
        return Coolcar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/trip',
            data: req,
            respMarshaller: rental.v1.TripEntity.fromObject,
        })
    }

    export function GetTrip(id: string): Promise<rental.v1.ITrip> {
        return Coolcar.sendRequestWithAuthRetry({
            method: 'GET',
            path: `/v1/trip/${encodeURIComponent(id)}`,
            respMarshaller: rental.v1.Trip.fromObject,
        })
    }

    export function GetTrips(s?: rental.v1.TripStatus): Promise<rental.v1.IGetTripsResponse> {
        let path = '/v1/trips'
        if (s) {
            path += `?status=${s}`
        }
        return Coolcar.sendRequestWithAuthRetry({
            method: 'GET',
            path,
            respMarshaller: rental.v1.GetTripsResponse.fromObject,
        })
    }
}