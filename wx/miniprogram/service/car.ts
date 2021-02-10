import camelcaseKeys = require("camelcase-keys");
import { car } from "./proto_gen/car/car_pb";
import { Coolcar } from "./request";

export namespace CarService {
    export function subscribe(onMsg: (c: car.v1.ICarEntity) => void) {
        const socket = wx.connectSocket({
            url: Coolcar.wsAddr + '/ws',
        })
        socket.onMessage(msg => {
            const obj = JSON.parse(msg.data as string)
            onMsg(car.v1.CarEntity.fromObject(
                camelcaseKeys(obj, {
                    deep: true,
                })))
        })
        return socket
    }

    export function getCar(id: string): Promise<car.v1.ICar> {
        return Coolcar.sendRequestWithAuthRetry({
            method: 'GET',
            path: `/v1/car/${encodeURIComponent(id)}`,
            respMarshaller: car.v1.Car.fromObject,
        })
    }
}