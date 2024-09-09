// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons:[
      {
        text: '删除',
        type:'warn',
        extClass: 'test'
      },
    ],
    messageList: [{
      img: 'cloud://watch-1guy6odg4ff5de80.7761-watch-1guy6odg4ff5de80-1323186817/FZdr2qJLZvpW42b472ac31f739d91801eec51cead890.jpg',
      title: '嘉膑电影网',
      content: '你关注的电影已经上映了',
      time: '2023/12/20  9:5'
    }],
    showslide: false
  },

  touchstart(){
    this.setData({
      showslide: false
    })
  },

  onBtn(e) {
    this.data.messageList.splice(this.data.messageList.findIndex(index => index == e.currentTarget.dataset.btn), 1)
        this.setData({
          messageList: this.data.messageList
        })
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