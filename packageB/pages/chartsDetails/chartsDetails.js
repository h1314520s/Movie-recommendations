// components/chartsDetails/chartsDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    watchList: [],
    title: '',
    condition: '',
    pageSize: 10,
    pageIndex: 1,
    triggered: false
  },

  goFilmReview(e) {
    if (wx.getStorageSync('code') == '') {
      wx.showToast({
        title: '请先登录',
        icon: 'error'
      })
    } else {
      wx.navigateTo({
        url: '/packageB/pages/filmReview/filmReview?userId=' + wx.getStorageSync('id') + '&watchId=' + this.data.watchList[e.currentTarget.dataset.index].id,
      })
    }
  },

  getWatchList(condition) {
    wx.cloud.callFunction({
      name: 'getWatchList',
      data: {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        watchType: condition
      }
    }).then(res => {
      let watchList = []
      res.result.data.map(res => {
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
        watchList = [...watchList, {
          id: res._id,
          img: res.watchPoster,
          title: res.watchName,
          watchTime: res.watchTime,
          release: res.release,
          score: res.score,
          watchType: type
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
    this.getWatchList(this.data.condition)
  },

  refresherrefresh() {
    this.setData({
      pageIndex: 1,
      watchList: []
    })
    this.getWatchList(this.data.condition)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      title: options.title,
      pageIndex: 1,
      watchList: []
    })
    switch (this.data.title) {
      case '电影推荐':
        this.setData({
          condition: 'all'
        })
        break;
      case '最新上映的电影':
        this.setData({
          condition: 'all'
        })
        break;
      case '一周口碑电影榜':
        this.setData({
          condition: 'all'
        })
        break;
      case 'TOP250':
        this.setData({
          condition: 'all'
        })
        break;
      case '华语口碑榜':
        this.setData({
          condition: 'all'
        })
        break;
      case '全球口碑榜':
        this.setData({
          condition: 'all'
        })
        break;
      case '高分经典喜剧片榜':
        this.setData({
          condition: 'comedy'
        })
        break;
      default:
        break;
    }
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
      watchList: []
    })
    this.getWatchList(this.data.condition)
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