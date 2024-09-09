// pages/my/my.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    username:'',
    imgUrl: '',
    id: '',
    power: '',
    commentNum: '',
    browseNum: ''
  },
  
  login(e) {
    wx.navigateTo({
      url: '/packageA/pages/login/login?type=' + e.currentTarget.dataset.value,
    })
  },

  modify(e) {
    wx.navigateTo({
      url: '/packageA/pages/login/login?type=' + e.currentTarget.dataset.value,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.obtain()
  },

  obtain(){
    this.setData({
      code: wx.getStorageSync('code'),
      useraccount: wx.getStorageSync('useraccount')
    })
    db.collection('userList').where({
      useraccount: this.data.useraccount
    }).get().then(res => {
      if (res.data.length != 0) {
        this.setData({
          username: res.data[0].username,
          imgUrl: res.data[0].photo,
          id: res.data[0]._id,
          power: res.data[0].power
        })
        wx.setStorageSync('id', res.data[0]._id)
        this.read()
      }
    })
  },

  read() {
    db.collection('commentList').where({
      userId: this.data.id
    }).get().then(res => {
      this.setData({
        commentNum: res.data.length
      })
    })
    db.collection('browseList').where({
      userId: this.data.id
    }).get().then(res => {
      this.setData({
        browseNum: res.data.length
      })
    })
  },

  exit() {
    wx.removeStorage({
      key: 'useraccount',
    })
    wx.removeStorage({
      key: 'code',
    })
    wx.removeStorage({
      key: 'id',
    })
    this.onLoad()
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
    this.obtain()
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