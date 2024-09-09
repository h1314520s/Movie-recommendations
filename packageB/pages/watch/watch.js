// components/watch/watch.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [],
    showslide: false,
    watchList: [],
    type: '',
    pageIndex: 1,
    pageSize: 4
  },

  touchstart() {
    this.setData({
      showslide: false
    })
  },

  pageBtn(value) {
    switch (value) {
      case 'comment':
        this.setData({
          slideButtons: [{
              text: '查看',
              type: 'warn',
              extClass: 'test'
            },
            {
              text: '删除',
              type: 'warn',
              extClass: 'test'
            }
          ]
        })
        this.getCommentList()
        break;
      case 'footprint':
        this.setData({
          slideButtons: [{
            text: '删除',
            type: 'warn',
            extClass: 'test'
          }, ]
        })
        this.getBrowseList()
        break;

      default:
        break;
    }
  },

  onBtn(e) {
    if (this.data.slideButtons[e.detail.index].text == '查看') {
      wx.navigateTo({
        url: '/packageB/pages/filmReview/filmReview?Uid=' + e.currentTarget.dataset.btn.Uid + '&watchId=' + e.currentTarget.dataset.btn.watchId,
      })
    } else {
      this.edit(this.data.type, e.currentTarget.dataset.btn)
    }
  },

  getBrowseList() {
    db.collection('browseList').where({
      userId: wx.getStorageSync('id')
    }).limit(this.data.pageSize)
      .skip((this.data.pageIndex - 1) * this.data.pageSize)
      .get().then(res => {
        this.showBrowseList(res.data)
      })
  },

  showBrowseList(data) {
    let watchList = []
    data.forEach(i => {
      db.collection('watchList').where({
        _id: i.watchId
      }).get().then(res => {
        res.data.map(res => {
          let type = []
          res.watchType.forEach(item => {
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
          });
          watchList = [...this.data.watchList, {
            watchId: res._id,
            img: res.watchPoster,
            title: res.watchName,
            watchType: type,
            release: res.release,
            watchTime: res.watchTime,
            score: res.score,
            browseTime: i.browseTime,
            commentTime: i.commentTime,
            Uid: i._id
          }]
          this.setData({
            watchList: watchList
          })
        })
      });
    })
  },

  scrolltolower() {
    this.setData({
      pageIndex: this.data.pageIndex += 1
    })
    if (this.data.type == 'comment') {
      this.getCommentList()
    } else {
      this.getBrowseList()
    }
  },

  refresherrefresh() {
    this.setData({
      pageIndex: 1,
      watchList: [],
    })
    if (this.data.type == 'comment') {
      this.getCommentList()
    } else {
      this.getBrowseList()
    }
  },

  getCommentList() {
    db.collection('commentList').where({
      userId: wx.getStorageSync('id')
    }).limit(this.data.pageSize)
      .skip((this.data.pageIndex - 1) * this.data.pageSize)
      .get().then(res => {
        this.showBrowseList(res.data)
      })
  },

  edit(type, watch) {
    if (type == 'comment') {
      db.collection('commentList').doc(watch.Uid).remove().then(res => {
        this.data.watchList.splice(this.data.watchList.findIndex(index => index == watch), 1)
        this.setData({
          watchList: this.data.watchList
        })
      })
    } else {
      db.collection('browseList').doc(watch.Uid).remove().then(res => {
        this.data.watchList.splice(this.data.watchList.findIndex(index => index == watch), 1)
        this.setData({
          watchList: this.data.watchList
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      type: options.page
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
      watchList: [],
    })
    this.pageBtn(this.data.type);
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