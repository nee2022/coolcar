// pages/test2/test2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onShow: function() {
    console.log('lifecycle: test2 onShow')
  },
  onHide: function() {
    console.log('lifecycle: test2 onHide')
  },
  onReady: function() {
    console.log('lifecycle: test2 onReady')
  },  
  onUnload: function() {
    console.log('lifecycle: test2 onUnload')
  },
  onLoad: function() {
    console.log('lifecycle: test2 onLoad')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})