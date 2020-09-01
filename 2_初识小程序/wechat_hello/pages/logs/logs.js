//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onShow: function() {
    console.log('lifecycle: logs onShow')
  },
  onHide: function() {
    console.log('lifecycle: logs onHide')
  },
  onReady: function() {
    console.log('lifecycle: logs onReady')
  },  
  onUnload: function() {
    console.log('lifecycle: logs onUnload')
  },
  onLoad: function (opt) {
    console.log('lifecycle: logs onLoad')
    console.log(opt);
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      logColor: opt.color,
    })
  },
  onLogTap: function() {
    wx.navigateTo({
      url: '/pages/test2/test2'
    })
  }
})
