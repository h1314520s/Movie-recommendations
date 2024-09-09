// components/filmReview/filmReview.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    score: '',
    userId: '',
    watchId: '',
    photo: '',
    username: '',
    avg: '',
    editType: false,
    Uid: ''
  },

  onChange(e) {
    this.setData({
      score: e.detail * 2
    })
  },

  input(e) {
    this.setData({
      value: e.detail
    })
  },

  submit() {
    if (!this.data.value) {
      wx.showToast({
        title: '请输入影评',
        icon: 'error',
        duration: 2000
      })
    } else if (!this.data.score) {
      wx.showToast({
        title: '请评分',
        icon: 'error',
        duration: 2000
      })
    } else {
      this.upComment()
      this.average()
    }
  },

  getUser() {
    db.collection('userList').where({
      _id: this.data.userId
    }).get().then(res => {
      this.setData({
        photo: res.data[0].photo,
        username: res.data[0].username
      })
    })
  },

  upComment() {
    let time = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`;
    db.collection('commentList').add({
      data: {
        comment: this.data.value,
        score: this.data.score,
        watchId: this.data.watchId,
        photo: this.data.photo,
        username: this.data.username,
        userId: this.data.userId,
        commentTime: time
      }
    }).then(res => {
      wx.navigateBack({
        delta: 1
      })
    })
  },

  average() {
    db.collection('commentList').aggregate()
      .group({
        _id: '$watchId',
        avgSales: db.command.aggregate.avg('$score')
      })
      .end()
      .then(res => {
        let avg = res.list.find(item => {
          return item._id == this.data.watchId
        })
        let num = parseFloat(avg.avgSales).toFixed(1)
        this.upAvg(num)
      })
  },

  upAvg(avg) {
    db.collection('watchList').where({
        _id: this.data.watchId
      })
      .update({
        data: {
          score: avg
        }
      })
  },

  getFimReview() {
    db.collection('commentList').where({
      _id: this.data.Uid
    }).get().then(res => {
      this.setData({
        score: res.data[0].score,
        value: res.data[0].comment
      })
    })

  },

  edit() {
    if (!this.data.value) {
      wx.showToast({
        title: '请输入影评',
        icon: 'error',
        duration: 2000
      })
    } else if (!this.data.score) {
      wx.showToast({
        title: '请评分',
        icon: 'error',
        duration: 2000
      })
    } else {
      let time = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`;
      db.collection('commentList').where({
        _id: this.data.Uid
      }).update({
        data:{
          score: this.data.score,
          comment: this.data.value,
          commentTime: time
        }
      }).then(res => {
        this.average()
        wx.navigateBack({
          delta: 1
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      userId: options.userId,
      watchId: options.watchId
    })
    if (options.Uid) {
      this.setData({
        editType: true,
        Uid: options.Uid
      })
      this.getFimReview()
    }
    this.getUser()
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