// packageB/pages/search/search.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    list: [],
    pageSize: 5,
    pageIndex: 1,
    triggered: false
  },

  isShow() {
    this.setData({
      value: this.data.value.trim()
    })
    if(this.data.value.length == 0) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      this.getNewWatchList()
    }
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },

  getNewWatchList() {
    db.collection('watchList').where({
      watchName: db.RegExp({//按照KeyWord模糊查询
        regexp: this.data.value, //模糊搜索监听到的搜索信息
        options: 'i', //不区分大小写
      })
    }).get().then(res => {
      let watchList = []
      res.data.map(res => {
        watchList = [...watchList, {
          id: res._id,
          img: res.watchPoster,
          title: res.watchName,
          star: res.watchStar,
          watchTime: res.watchTime,
          release: res.release,
          score: res.score
        }]
      })
      this.setData({
        list: watchList,
        triggered: false
      })
    })
  },

  scrolltolower() {
    this.getNewWatchList()
  },

  refresherrefresh() {
    this.setData({
      list: []
    })
    this.getNewWatchList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      value: options.watchName,
      watchList: []
    });
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
    this.setData({
      list: []
    })
    this.getNewWatchList()
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