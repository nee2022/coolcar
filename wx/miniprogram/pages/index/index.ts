import { IAppOption } from "../../appoption"
import { CarService } from "../../service/car"
import { ProfileService } from "../../service/profile"
import { rental } from "../../service/proto_gen/rental/rental_pb"
import { TripService } from "../../service/trip"
import { routing } from "../../utils/routing"

interface Marker {
  iconPath: string
  id: number
  latitude: number
  longitude: number
  width: number
  height: number
}

const defaultAvatar = '/resources/car.png'
const initialLat = 29.761267625855936
const initialLng = 121.87264654736123

Page({
  isPageShowing: false,
  socket: undefined as WechatMiniprogram.SocketTask | undefined,

  data: {
    avatarURL: '',
    setting: {
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: true,
      subKey: '',
      layerStyle: -1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: false,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
    },
    location: {
      latitude: initialLat,
      longitude: initialLng,
    },
    scale: 16,
    markers: [] as Marker[],
  },

  async onLoad() {
    const userInfo = await getApp<IAppOption>().globalData.userInfo
    this.setData({
      avatarURL: userInfo.avatarUrl,
    })
  },

  onMyLocationTap() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
        })
      }, 
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '请前往设置页授权',
        })
      }
    })
  },

  async onScanTap() {
    const trips = await TripService.getTrips(rental.v1.TripStatus.IN_PROGRESS)
    if ((trips.trips?.length || 0) > 0) {
      await this.selectComponent('#tripModal').showModal()
      wx.navigateTo({
        url: routing.drving({
          trip_id: trips.trips![0].id!,
        }),
      })
      return
    }
    wx.scanCode({
      success: async () => {
        // TODO: get car id from scan result
        const carID='60af01e5a21ead3dccbcd1d8'
        const lockURL = routing.lock({
          car_id: carID,
        })
        const prof = await ProfileService.getProfile()
        if (prof.identityStatus === rental.v1.IdentityStatus.VERIFIED) {
          wx.navigateTo({
            url: lockURL,
          })
        } else {
          await this.selectComponent('#licModal').showModal()
          wx.navigateTo({
            url: routing.register({
              redirectURL: lockURL,
            })
          })
        }
      },
      fail: console.error,
    })
  },

  onShow() {
    this.isPageShowing = true;
    if (!this.socket) {
      this.setData({
        markers: []
      }, () => {
        this.setupCarPosUpdater()
      })
    }
  },
  
  onHide() {
    this.isPageShowing = false;
    if (this.socket) {
      this.socket.close({
        success: () => {
          this.socket = undefined
        }
      })
    }
  },

  onMyTripsTap() {
    wx.navigateTo({
      url: routing.mytrips(),
    })
  },

  setupCarPosUpdater() {
    const map = wx.createMapContext("map")
    const markersByCarID = new Map<string, Marker>()
    let translationInProgress = false
    const endTranslation = () => {
      translationInProgress = false
    }
    this.socket = CarService.subscribe(car => {
      if (!car.id || translationInProgress || !this.isPageShowing) {
        console.log('dropped')
        return
      }
      const marker = markersByCarID.get(car.id)
      if (!marker) {
        // Insert new marker.
        const newMarker: Marker = {
          id: this.data.markers.length,
          iconPath: car.car?.driver?.avatarUrl || defaultAvatar,
          latitude: car.car?.position?.latitude || initialLat,
          longitude: car.car?.position?.longitude || initialLng,
          height: 20,
          width: 20,
        }
        markersByCarID.set(car.id, newMarker)
        this.data.markers.push(newMarker)
        translationInProgress = true
        this.setData({
          markers: this.data.markers,
        }, endTranslation)
        return
      }

      const newAvatar = car.car?.driver?.avatarUrl || defaultAvatar
      const newLat = car.car?.position?.latitude || initialLat
      const newLng = car.car?.position?.longitude || initialLng
      if (marker.iconPath !== newAvatar) {
        // Change iconPath and possibly position.
        marker.iconPath = newAvatar
        marker.latitude = newLat
        marker.longitude = newLng
        translationInProgress = true
        this.setData({
          markers: this.data.markers,
        }, endTranslation)
        return
      }

      if (marker.latitude !== newLat || marker.longitude !== newLng) {
        // Move marker.
        translationInProgress = true
        map.translateMarker({
          markerId: marker.id,
          destination: {
            latitude: newLat,
            longitude: newLng,
          },
          autoRotate: false,
          rotate: 0,
          duration: 80,
          animationEnd: endTranslation,
        })
      }
    })
  },
})
