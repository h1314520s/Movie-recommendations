// components/manage/manage.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons:[
      {
        text: '编辑',
        type:'warn',
        extClass: 'test'
      },
      {
        text: '删除',
        type:'warn',
        extClass: 'test'
      }
    ],
    showslide: false,
    watchList: [],
    pageSize: 10,
    pageIndex: 1,
    triggered: false
  },

  touchstart(){
    this.setData({
      showslide: false
    })
  },

  onBtn(e) {
    if (this.data.slideButtons[e.detail.index].text == '编辑') {
      wx.navigateTo({
        url: '/packageB/pages/edit/edit?id=' + e.currentTarget.dataset.btn.id,
      })
    }else {
      // console.log(e.currentTarget.dataset.btn);
      db.collection('watchList').doc(e.currentTarget.dataset.btn.id).remove().then(res => {
        this.data.watchList.splice(this.data.watchList.findIndex(index => index == e.currentTarget.dataset.btn), 1)
        this.setData({
          watchList: this.data.watchList
        })
      })
    } 
  },


  addWatch() {
    wx.navigateTo({
      url: '/packageB/pages/edit/edit',
    })
  },

  getwatchList() {
    wx.cloud.callFunction({
      name: 'getWatchList',
      data: {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        watchType: 'all'
      }
    }).then(res => {
      let watchList = []
      res.result.data.map(res => {
        watchList = [...watchList, {
          id: res._id,
          title: res.watchName,
        }]
      })
      this.setData({
        watchList: [...this.data.watchList, ...watchList],
        triggered: false
      })
    })
  },

  scrolltolower() {
    this.setData({
      pageIndex: this.data.pageIndex += 1
    })
    this.getwatchList()
  },

  refresherrefresh() {
    this.setData({
      pageIndex: 1,
      watchList: []
    })
    this.getwatchList()
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
    this.refresherrefresh()
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