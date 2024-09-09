// components/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    value: ''
  },

  isShow() {
    this.setData({
      isShow: !this.data.isShow,
    })
    console.log(this.data.isShow)
    if(this.data.isShow == true) {
      this.setData({
        value: this.data.value.trim()
      })
      if(this.data.value != '') {
        wx.navigateTo({
          url: '/packageB/pages/search/search?watchName=' +  this.data.value,
        })
        this.setData({
          value: ''
        })
      }
    }
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})