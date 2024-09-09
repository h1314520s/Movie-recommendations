// pages/charts/charts.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chartsList: [
      {
        title: '一周口碑电影榜',
        img: 'bg', 
        charts: [
          {
            img: '蜡笔小新：新次元！超能力大决战',
            title: '蜡笔小新：新次元！超能力大决战',
            score: '9.7'
          },
          {
            img: '涉过愤怒的海',
            title: '涉过愤怒的海',
            score: '9.6'
          },
          {
            img: '拯救嫌疑人',
            title: '拯救嫌疑人',
            score: '9.5'
          }
        ]
      },
      {
        title: 'TOP250',
        img: 'cloud://cloud-5gfnau1kaecbb8e1.636c-cloud-5gfnau1kaecbb8e1-1314821660/TOP250.png', 
        charts: []
      },
      {
        title: '华语口碑榜',
        img: 'cloud://cloud-5gfnau1kaecbb8e1.636c-cloud-5gfnau1kaecbb8e1-1314821660/华语口碑榜.png', 
        charts: []
      },
      {
        title: '全球口碑榜',
        img: 'cloud://cloud-5gfnau1kaecbb8e1.636c-cloud-5gfnau1kaecbb8e1-1314821660/全球口碑榜.png', 
        charts: []
      },
      {
        title: '高分经典喜剧片榜',
        img: 'cloud://cloud-5gfnau1kaecbb8e1.636c-cloud-5gfnau1kaecbb8e1-1314821660/高分经典喜剧片榜.png', 
        charts: []
      }
    ]
  },

  getComedyList() {
    db.collection('watchList').where({
      watchType: 'comedy'
    }).limit(3).get().then(res=> {
      let watchList = []
      res.data.map(res => {
        watchList = [...watchList, {
          img: res.watchPoster,
          title: res.watchName,
          score: res.score
        }]
      })
      this.setData({
        'chartsList[4].charts': watchList
      })
    })
  },

  getChartsList(condition) {
    db.collection('watchList').limit(3).get().then(res=> {
      let watchList = []
      res.data.map(res => {
        watchList = [...watchList, {
          img: res.watchPoster,
          title: res.watchName,
          score: res.score
        }]
      })
      switch (condition) {
        case '一周口碑电影榜':
          this.setData({
            'chartsList[0].charts': watchList
          })
          break;
        case 'TOP250':
          this.setData({
            'chartsList[1].charts': watchList
          })
          break;
        case '华语口碑榜':
          this.setData({
            'chartsList[2].charts': watchList
          })
          break;
        case '全球口碑榜':
          this.setData({
            'chartsList[3].charts': watchList
          })
          break;
        default:
          break;
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getChartsList('一周口碑电影榜')
    this.getChartsList('TOP250')
    this.getChartsList('华语口碑榜')
    this.getChartsList('全球口碑榜')
    this.getComedyList()
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