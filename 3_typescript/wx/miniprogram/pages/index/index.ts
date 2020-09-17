// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World from typescript',
    userInfo: {},
    hasUserInfo: false,
  },
  // 事件处理函数
  bindViewTap() {
    wx.redirectTo({
      url: '../logs/logs',
    })
  },
  async onLoad() {
    const userInfo = await app.globalData.userInfo
    this.setData({
      userInfo,
      hasUserInfo: true,
    })

    // this.updateMotto()
  },
  getUserInfo(e: any) {
    console.log(e)
    const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
    app.resolveUserInfo(userInfo)
  },
  updateMotto() {
    // 在10秒之内持续更新Motto
    let shouldStop = false
    setTimeout(() => {
      shouldStop = true
    }, 10000);

    let count = 0
    const update = () => {
      count++
      if (!shouldStop) {
        this.setData({
          motto: `Update count: ${count}`,
        }, () => {
          update()
        })
      }
    }

    update()
  },
})
