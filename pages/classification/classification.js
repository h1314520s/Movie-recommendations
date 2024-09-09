// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:[ 
      {type:'all', title: '全部'},
      {type:'comedy', title: '喜剧'},
      {type:'animation', title: '动画'},
      {type:'love', title: '爱情'},
      {type:'terror', title: '恐怖'},
      {type:'gunplay', title: '枪战'},
      {type:'scienceFiction', title: '科幻'},
      {type:'war', title: '战争'},
      {type:'suspense', title: '悬疑'},
      {type:'youth', title: '青春'},
      {type:'gangster', title: '警匪'},
      {type:'history', title: '历史'},
      {type:'other', title: '其他'}
    ],
    watchList: [],
    active: 0,
    watchType: 'all',
    pageSize: 6,
    pageIndex: 1,
    triggered: false
  },

  toggle(e) {
    this.setData({
      active: e.currentTarget.dataset.index,
      watchType: this.data.typeList[e.currentTarget.dataset.index].type,
      watchList: [],
      pageIndex: 1
    })
    this.getNewWatchList()
  },

  getNewWatchList() {
    wx.cloud.callFunction({
      name: 'getWatchList',
      data: {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        watchType: this.data.watchType
      }
    }).then(res => {
      let watchList = []
      res.result.data.map(res => {
        watchList = [...watchList, {
          id: res._id,
          img: res.watchPoster,
          title: res.watchName,
          sketch: res.introduce,
          type: res.watchType
        }]
      })
      this.setData({
        watchList: [...this.data.watchList, ...watchList],
        triggered: false
      })
    })
    
  },

  refresherrefresh() {
    this.setData({
      pageIndex: 1,
      watchList: []
    })
    this.getNewWatchList()
  },

  scrolltolower() {
    this.setData({
      pageIndex: this.data.pageIndex += 1
    })
    this.getNewWatchList()
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getNewWatchList()
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