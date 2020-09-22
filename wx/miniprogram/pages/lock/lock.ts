const shareLocationKey = "share_location"

Page({
    data: {
        shareLocation: false,
        avatarURL: '',
    },

    async onLoad() {
        const userInfo = await getApp<IAppOption>().globalData.userInfo
        this.setData({
            avatarURL: userInfo.avatarUrl,
            shareLocation: wx.getStorageSync(shareLocationKey) || false,
        })
    },

    onGetUserInfo(e: any) {
        const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
        if (userInfo) {
            getApp<IAppOption>().resolveUserInfo(userInfo)
            this.setData({
                shareLocation: true,
            })
            wx.setStorageSync(shareLocationKey, true)
        }
    },

    onShareLocation(e: any) {
        const shareLocation:boolean = e.detail.value
        wx.setStorageSync(shareLocationKey, shareLocation)
    }
})