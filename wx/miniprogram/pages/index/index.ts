import { IAppOption } from "../../appoption"
import { ProfileService } from "../../service/profile"
import { rental } from "../../service/proto_gen/rental/rental_pb"
import { TripService } from "../../service/trip"
import { routing } from "../../utils/routing"

Page({
  isPageShowing: false,

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
      latitude: 23.099994,
      longitude: 113.32452,
    },
    scale: 10,
    markers: [
      {
        iconPath: "/resources/car.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      },
      {
        iconPath: "/resources/car.png",
        id: 1,
        latitude: 23.099994,
        longitude: 114.324520,
        width: 50,
        height: 50
      },
    ],
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
        const carID='5fd723331f83d01a598e7f84'
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
  },
  
  onHide() {
    this.isPageShowing = false;
  },

  onMyTripsTap() {
    wx.navigateTo({
      url: routing.mytrips(),
    })
  },

  moveCars() {
    const map = wx.createMapContext("map")
    const dest = {
      latitude: 23.099994,
      longitude: 113.324520,
    }

    const moveCar = () => {
      dest.latitude += 0.1
      dest.longitude += 0.1
      map.translateMarker({
        destination: {
          latitude: dest.latitude,
          longitude: dest.longitude,
        },
        markerId: 0,
        autoRotate: false,
        rotate: 0,
        duration: 5000,
        animationEnd: () => {
          if (this.isPageShowing) {
            moveCar()
          }
        }
      })
    }

    moveCar()
  },
})
