import { rental } from "../../service/proto_gen/rental/rental_pb"
import { TripService } from "../../service/trip"
import { formatDuration, formatFee } from "../../utils/format"
import { routing } from "../../utils/routing"

const updateIntervalSec = 5

function durationStr(sec: number) {
    const dur = formatDuration(sec)
    return `${dur.hh}:${dur.mm}:${dur.ss}`
}

Page({
    timer: undefined as number|undefined,
    tripID: '',

    data: {
        location: {
            latitude: 32.92,
            longitude: 118.46,
        },
        scale: 14,
        elapsed: '00:00:00',
        fee: '0.00',
    },

    onLoad(opt: Record<'trip_id', string>) {
        const o: routing.DrivingOpts = opt
        this.tripID = o.trip_id
        this.setupLocationUpdator()
        this.setupTimer(o.trip_id)
    },

    onUnload() {
        wx.stopLocationUpdate()
        if (this.timer) {
            clearInterval(this.timer)
        }
    },

    setupLocationUpdator() {
        wx.startLocationUpdate({
            fail: console.error,
        })
        wx.onLocationChange(loc => {
            this.setData({
                location: {
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
            })
        })
    },

    async setupTimer(tripID: string) {
        const trip = await TripService.updateTripPos(tripID)
        if (trip.status !== rental.v1.TripStatus.IN_PROGRESS) {
            console.error('trip not in progress')
            return
        }
        let secSinceLastUpdate = 0
        let lastUpdateDurationSec = trip.current!.timestampSec! - trip.start!.timestampSec!
        this.setData({
            elapsed: durationStr(lastUpdateDurationSec),
            fee: formatFee(trip.current!.feeCent!)
        })

        this.timer = setInterval(() => {
            secSinceLastUpdate++
            if (secSinceLastUpdate % updateIntervalSec === 0) {
                TripService.updateTripPos(tripID, {
                    latitude: this.data.location.latitude,
                    longitude: this.data.location.longitude,
                }).then(trip => {
                    lastUpdateDurationSec = trip.current!.timestampSec! - trip.start!.timestampSec!
                    secSinceLastUpdate = 0
                    this.setData({
                        fee: formatFee(trip.current!.feeCent!),
                    })
                }).catch(console.error)
            }
            this.setData({
                elapsed: durationStr(lastUpdateDurationSec + secSinceLastUpdate),
            })
        }, 1000)
    },

    onEndTripTap() {
        TripService.finishTrip(this.tripID).then(() => {
            wx.redirectTo({
                url: routing.mytrips(),
            })
        }).catch(err => {
            console.error(err)
            wx.showToast({
                title: '结束行程失败',
                icon: 'none',
            })
        })
    }
})