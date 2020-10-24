import { rental } from "./proto_gen/rental/rental_pb";
import { Coolcar } from "./request";

export namespace ProfileService {
    export function getProfile(): Promise<rental.v1.IProfile> {
        return Coolcar.sendRequestWithAuthRetry({
            method: 'GET',
            path: '/v1/profile',
            respMarshaller: rental.v1.Profile.fromObject,
        })
    }

    export function submitProfile(req: rental.v1.IIdentity): Promise<rental.v1.IProfile> {
        return Coolcar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/profile',
            data: req,
            respMarshaller: rental.v1.Profile.fromObject,
        })
    }

    export function clearProfile(): Promise<rental.v1.IProfile> {
        return Coolcar.sendRequestWithAuthRetry({
            method: 'DELETE',
            path: '/v1/profile',
            respMarshaller: rental.v1.Profile.fromObject,
        })
    }
}
