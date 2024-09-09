// index.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    recommendList: [],
    titleOne: {
      title: '电影推荐'
    },
    titleTwo: {
      title: '最新上映的电影'
    },
    pageSize: 4,
    pageIndex: 1,
    triggered: false
  },
  
  getRecommend(){
    db.collection('watchList').aggregate().sample({
      size: 4
    }).end().then(res=> {
      let watchList = []
      res.list.map(res => {
        watchList = [...watchList, {
          id: res._id,
          img: res.watchPoster,
          title: res.watchName
        }]
      })
      this.setData({
        recommendList: watchList
      })
    })
  },

  getNewWatchList() {
    wx.cloud.callFunction({
      name: 'getWatchList',
      data: {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        watchType: 'all'
      }
    }).then(res => {
      // console.log(res.result.data);
      let watchList = []
      res.result.data.map(res => {
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
        list: [...this.data.list, ...watchList],
        triggered: false
      })
    })
  },

  scrolltolower() {
    this.setData({
      pageIndex: this.data.pageIndex += 1
    })
    this.getNewWatchList()
  },

  refresherrefresh() {
    this.setData({
      pageIndex: 1,
      recommendList: [],
      list: []
    })
    this.getRecommend()
    this.getNewWatchList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      pageIndex: 1,
      recommendList: [],
      watchList: []
    })
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
      pageIndex: 1,
      recommendList: [],
      list: []
    })
    this.getRecommend()
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