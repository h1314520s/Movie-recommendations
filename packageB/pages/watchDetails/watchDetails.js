// components/watchDetails/watchDetails.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    watch: [],
    watchType: [],
    commentList: [],
    showFold: false,
    onFold: false,
    show: false,
  },

  goFilmReview() {
    if (wx.getStorageSync('code') == '') {
      wx.showToast({
        title: '请先登录',
        icon: 'error'
      })
    } else {
      wx.navigateTo({
        url: '/packageB/pages/filmReview/filmReview?userId=' + wx.getStorageSync('id') + '&watchId=' + this.data.watch._id,
      })
    }
  },

  checkFold() {
    wx.createSelectorQuery().selectAll(".subject-intro-conent").boundingClientRect(res => {
      if (res[0].height < res[1].height) {
        this.setData({
          showFold: true
        })
      }
    }).exec()
  },

  handleFold() {
    this.setData({
      onFold: !this.data.onFold
    })
  },

  getWatch(id) {
    db.collection('watchList').where({
      _id:id
    }).get().then(res => {
      this.setData({
        watch: res.data[0]
      })
      let type = []
      this.data.watch.watchType.forEach(item => {
        switch (item) {
          case 'comedy':
            type.push('喜剧')
            break;
          case 'animation':
            type.push('动画')
            break;
          case 'love':
            type.push('爱情')
            break;
          case 'terror':
            type.push('恐怖')
            break;
          case 'gunplay':
            type.push('枪战')
            break;
          case 'scienceFiction':
            type.push('科幻')
            break;
          case 'war':
            type.push('战争')
            break;
          case 'suspense':
            type.push('悬疑')
            break;
          case 'youth':
            type.push('青春')
            break;
          case 'gangster':
            type.push('警匪')
            break;
          case 'history':
            type.push('历史')
            break;
          case 'other':
            type.push('其他')
            break;
          default:
            break;
        }
        this.setData({
          watchType: type
        })
      });
      this.checkFold()
    })
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  getCommentList(watchId) {
    db.collection('commentList').where({
      watchId: watchId
    }).get().then(res => {
      this.setData({
        commentList: res.data
      })
    })
  },

  upbrowse() {
    db.collection('browseList').add({
      data:{
        userId: wx.getStorageSync('id'),
        watchId: this.data.watch._id,
        browseTime: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getWatch(this.data.id)
    this.getCommentList(this.data.id)
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
    this.getWatch(this.data.id)
    this.getCommentList(this.data.id)
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
    this.upbrowse()
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