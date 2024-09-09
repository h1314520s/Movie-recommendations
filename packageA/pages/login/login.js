// packageA/pages/login/login.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    username: '',
    useraccount: '',
    password: '',
    imgUrl: '',
    imgName: '',
    oldPassword: '',
    newPassword: '',
    power: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      type: options.type
    })
    if (options.type == 'modify') {
      db.collection('userList').where({
        _id: wx.getStorageSync('id')
      }).get().then(res => {
        if (res.data.length != 0) {
          this.setData({
            username: res.data[0].username,
            useraccount: res.data[0].useraccount,
            imgUrl: res.data[0].photo,
            password: res.data[0].password
          })
        }
      })
    }
  },

  upload() {
    let that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        let str = res.tempFiles[0].tempFilePath.split('/')
        that.setData({
          imgUrl: res.tempFiles[0].tempFilePath,
          imgName: str[str.length - 1]
        })
      }
    })
  },

  save() {
    if (this.data.username.length < 2) {
      wx.showToast({
        title: '用户名至少2位',
        icon: 'error'
      })
    } else if (this.data.useraccount.length < 5) {
      wx.showToast({
        title: '账户至少8位数',
        icon: 'error'
      })
      db.collection("userList").where({
        useraccount: this.data.useraccount
      }).get().then(res => {
        if (res.data.length != 0) {
          wx.showToast({
            title: '该账号已存在',
            icon: 'error'
          })
        }
      })
    } else if (this.data.password.length < 8) {
      wx.showToast({
        title: '密码至少8位数',
        icon: 'error'
      })
    } else {
      wx.cloud.uploadFile({
        cloudPath: this.data.imgName,
        filePath: this.data.imgUrl, // 文件路径
      }).then(res => {
        this.setData({
          imgUrl: res.fileID
        })
        db.collection("userList").add({
          data: {
            photo: this.data.imgUrl,
            photoName: this.data.imgName,
            username: this.data.username,
            useraccount: this.data.useraccount,
            password: this.data.password,
            power: this.data.power
          }
        }).then(res => {
          wx.showToast({
            title: '创建成功',
          })
          this.login()
        })
      })
    }
  },

  login() {
    let that = this
    wx.login({
      success(res) {
        wx.setStorageSync('code', res.code)
        wx.setStorageSync('useraccount', that.data.useraccount)
        wx.switchTab({
          url: '/pages/my/my',
        })
      }
    })
    // wx.navigateBack({
    //   delta: 1
    // })
  },

  checking() {
    db.collection('userList').where({
      useraccount: this.data.useraccount
    }).get().then(res => {
      if (res.data.length != 0) {
        if (res.data[0].password == this.data.password) {
          this.login()
        } else {
          wx.showToast({
            title: '密码错误',
            icon: 'error'
          })
        }
      } else {
        wx.showToast({
          title: '账号不存在',
          icon: 'error'
        })
      }
    })
  },

  modify() {
    if (this.data.password == this.data.oldPassword) {
      wx.cloud.uploadFile({
        cloudPath: this.data.imgName,
        filePath: this.data.imgUrl, // 文件路径
      }).then(res => {
        this.setData({
          imgUrl: res.fileID
        })
        db.collection('userList').where({
          _id: wx.getStorageSync('id')
        }).update({
          data: {
            username: this.data.username,
            useraccount: this.data.useraccount,
            photo: this.data.imgUrl,
            photoName: this.data.imgName,
            password: this.data.newPassword
          }
        })
        wx.showToast({
          title: '修改成功',
          success(res) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      })
    } else {
      wx.showToast({
        title: '密码错误',
        icon: 'error'
      })
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