export const formatTime = (date: Date) => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function getSetting(): Promise<WechatMiniprogram.GetSettingSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: resolve,
      fail: reject,
    })
  })
}

export function getUserInfo(): Promise<WechatMiniprogram.GetUserInfoSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject,
    })
  })
}