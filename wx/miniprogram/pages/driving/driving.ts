import { TripService } from "../../service/trip"
import { routing } from "../../utils/routing"

const updateIntervalSec = 5

function formatDuration(sec: number) {
    const padString = (n: number) => 
        n < 10 ? '0'+n.toFixed(0) : n.toFixed(0)

    const h = Math.floor(sec/3600)
    sec -= 3600 * h
    const m = Math.floor(sec / 60)
    sec -= 60 * m
    const s = Math.floor(sec)
    return `${padString(h)}:${padString(m)}:${padString(s)}`
}

function formatFee(cents: number) {
    return (cents / 100).toFixed(2)
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
        let secSinceLastUpdate = 0
        let lastUpdateDurationSec = trip.current!.timestampSec! - trip.start!.timestampSec!
        this.setData({
            elapsed: formatDuration(lastUpdateDurationSec),
            fee: formatFee(trip.current!.feeCent!)
        })

        this.timer = setInterval(() => {
            secSinceLastUpdate++
            if (secSinceLastUpdate % 5 === 0) {
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
                elapsed: formatDuration(lastUpdateDurationSec + secSinceLastUpdate),
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