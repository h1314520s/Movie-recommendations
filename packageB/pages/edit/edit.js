// components/edit/edit.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refer: true,
    watchId: '',
    minDate: 725817600000, // 日历时间
    list: [{
        type: 'comedy',
        title: '喜剧',
        checked: false
      },
      {
        type: 'animation',
        title: '动画',
        checked: false
      },
      {
        type: 'love',
        title: '爱情',
        checked: false
      },
      {
        type: 'terror',
        title: '恐怖',
        checked: false
      },
      {
        type: 'gunplay',
        title: '枪战',
        checked: false
      },
      {
        type: 'scienceFiction',
        title: '科幻',
        checked: false
      },
      {
        type: 'war',
        title: '战争',
        checked: false
      },
      {
        type: 'suspense',
        title: '悬疑',
        checked: false
      },
      {
        type: 'youth',
        title: '青春',
        checked: false
      },
      {
        type: 'gangster',
        title: '警匪',
        checked: false
      },
      {
        type: 'history',
        title: '历史',
        checked: false
      },
      {
        type: 'other',
        title: '其他',
        checked: false
      },
    ],
    columns: ['中国', '英国', '美国'], // 地点
    showPicker: false, // 地点选择弹框
    showTime: false, // 时间弹框
    starShow: false, // 剧组弹出
    editStarShow: false, // 修改剧组
    starImg: '', // 临时剧组照片
    strarImgName: '', // 临时剧组照片名字
    starName: '', // 临时剧组明星
    starPost: '', // 临时剧组职位
    release: '', // 上映时间
    location: '', // 上映地点
    watchName: '', // 电影名字
    synopsis: '', // 简介
    introduce: '', // 介绍
    watchTime: '', // 电影时长
    watchPoster: [], // 海报
    watchHerald: [], // 预告片
    watchDrama: [], // 剧组照
    watchStar: [], // 明星
    watchType: [] // 电影类型
  },

  // 时间选择
  onDisplay() {
    this.setData({
      showTime: true
    });
  },
  onClose() {
    this.setData({
      showTime: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirmTime(event) {
    this.setData({
      showTime: false,
      release: this.formatDate(event.detail),
    });
  },

  // 地点选择
  isPicker() {
    this.setData({
      showPicker: !this.data.showPicker
    })
  },

  onConfirmLocation(event) {
    this.setData({
      location: event.detail.value
    })
    this.isPicker()
  },

  onCancelLocation() {
    this.isPicker()
  },

  // 图片上传
  add(e) {
    let that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        let str = res.tempFiles[0].tempFilePath.split('/')
        const List = []
        switch (e.currentTarget.dataset.type) {
          case 'watchPoster':
            List.push(...that.data.watchPoster, {
              url: res.tempFiles[0].tempFilePath,
              name: str[str.length - 1]
            })
            that.setData({
              watchPoster: List
            })
            break;
          case 'watchHerald':
            List.push(...that.data.watchHerald, {
              url: res.tempFiles[0].tempFilePath,
              name: str[str.length - 1]
            })
            that.setData({
              watchHerald: List
            })
            break;
          case 'watchDrama':
            List.push(...that.data.watchDrama, {
              url: res.tempFiles[0].tempFilePath,
              name: str[str.length - 1]
            })
            that.setData({
              watchDrama: List
            })
            break;
          case 'watchStar':
            that.setData({
              starImg: res.tempFiles[0].tempFilePath,
              strarImgName: str[str.length - 1]
            })
            break;
          default:
            break;
        }
      }
    })
  },

  edit(e) {
    let that = this
    switch (e.currentTarget.dataset.type) {
      case 'watchPoster':
        wx.cloud.deleteFile({
          fileList: [that.data.watchPoster[e.currentTarget.dataset.index].url]
        }).then(res => {
          that.data.watchPoster.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            watchPoster: that.data.watchPoster
          })
        })
        break;
      case 'watchHerald':
        // console.log(that.data.watchHerald[e.currentTarget.dataset.index]);
        wx.cloud.deleteFile({
          fileList: [that.data.watchHerald[e.currentTarget.dataset.index].url]
        }).then(res => {
          that.data.watchHerald.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            watchHerald: that.data.watchHerald
          })
        })
        break;
      case 'watchDrama':
        wx.cloud.deleteFile({
          fileList: [that.data.watchDrama[e.currentTarget.dataset.index].url]
        }).then(res => {
          that.data.watchDrama.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            watchDrama: that.data.watchDrama
          })
        })
        break;
      case 'watchStar':
        wx.cloud.deleteFile({
          fileList: [that.data.watchStar[e.currentTarget.dataset.index].url]
        }).then(res => {
          that.data.watchStar.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            watchStar: that.data.watchStar
          })
        })
        break;
      default:
        break;
    }
  },

  showStar() {
    this.setData({
      starShow: true
    });
  },

  onCloseStar() {
    this.setData({
      starShow: false,
    });
    this.addStar()
  },

  addStar() {
    if (this.data.starImg || this.data.starName || this.data.starPost) {
      this.data.watchStar.push({
        url: this.data.starImg,
        name: this.data.strarImgName,
        starName: this.data.starName,
        starPost: this.data.starPost
      })
      this.setData({
        watchStar: this.data.watchStar,
        starImg: '',
        starName: '',
        starPost: '',
      })
    }
  },

  watchTypeChange(e) {
    const watchType = e.detail.value;
    this.setData({
      watchType
    })
  },

  getWatch(watchId) {
    db.collection('watchList').where({
      _id: watchId
    }).get().then(res => {
      this.setData({
        watchName: res.data[0].watchName, // 电影名字
        synopsis: res.data[0].synopsis, // 简介
        introduce: res.data[0].introduce, // 介绍
        watchTime: res.data[0].watchTime, // 电影时长
        release: res.data[0].release, // 上映时间
        location: res.data[0].location, // 上映地点
        watchPoster: res.data[0].watchPoster, // 海报
        watchHerald: res.data[0].watchHerald, // 预告片
        watchDrama: res.data[0].watchDrama, // 剧组照
        watchStar: res.data[0].watchStar, // 剧组
        watchType: res.data[0].watchType, // 电影类型
      })
      this.data.list.forEach((item, index) => {
        if (this.data.watchType.indexOf(item.type) != -1) {
          this.data.list[index].checked = true
          this.setData({
            list: this.data.list
          })
        }
      })
    })
  },

  upWatchPoster() {
    return new Promise((resolve, reject) => {
      if (this.data.watchPoster.length == 0) {
        resolve(this.data.watchPoster)
      }
      this.data.watchPoster.forEach((item, index) => {
        wx.cloud.uploadFile({
          cloudPath: item.name,
          filePath: item.url, // 文件路径
        }).then(res => {
          this.setData({
            ['watchPoster[' + index + '].url']: res.fileID
          })
          if (this.data.watchPoster.length == index + 1) {
            resolve(this.data.watchPoster)
          }
        })
      })
    })
  },

  upWatchHerald() {
    return new Promise((resolve, reject) => {
      if (this.data.watchHerald.length == 0) {
        resolve(this.data.watchHerald)
      }
      this.data.watchHerald.forEach((item, index) => {
        wx.cloud.uploadFile({
          cloudPath: item.name,
          filePath: item.url, // 文件路径
        }).then(res => {
          this.setData({
            ['watchHerald[' + index + '].url']: res.fileID
          })
          if (this.data.watchHerald.length == index + 1) {
            resolve(this.data.watchHerald)
          }
        })
      })
    })
  },

  upWatchDrama() {
    return new Promise((resolve, reject) => {
      if (this.data.watchDrama.length == 0) {
        resolve(this.data.watchDrama)
      }
      this.data.watchDrama.forEach((item, index) => {
        wx.cloud.uploadFile({
          cloudPath: item.name,
          filePath: item.url, // 文件路径
        }).then(res => {
          this.setData({
            ['watchDrama[' + index + '].url']: res.fileID
          })
          if (this.data.watchDrama.length == index + 1) {
            resolve(this.data.watchDrama)
          }
        })
      })
    })
  },

  upWatchStar() {
    return new Promise((resolve, reject) => {
      if (this.data.watchStar.length == 0) {
        resolve(this.data.watchStar)
      }
      this.data.watchStar.forEach((item, index) => {
        wx.cloud.uploadFile({
          cloudPath: item.name,
          filePath: item.url, // 文件路径
        }).then(res => {
          this.setData({
            ['watchStar[' + index + '].url']: res.fileID
          })
          if (this.data.watchStar.length == index + 1) {
            resolve(this.data.watchStar)
          }
        })
      })
    })
  },

  async refer() {
    await Promise.all([this.upWatchPoster(), this.upWatchHerald(), this.upWatchDrama(), this.upWatchStar()]).then(res => {
      db.collection('watchList').add({
        data: {
          watchName: this.data.watchName, // 电影名字
          synopsis: this.data.synopsis, // 简介
          introduce: this.data.introduce, // 介绍
          watchTime: this.data.watchTime, // 电影时长
          release: this.data.release, // 上映时间
          location: this.data.location, // 上映地点
          watchPoster: this.data.watchPoster, // 海报
          watchHerald: this.data.watchHerald, // 预告片
          watchDrama: this.data.watchDrama, // 剧组照
          watchStar: this.data.watchStar, // 剧组
          watchType: this.data.watchType, // 电影类型
        }
      }).then(res => {
        wx.showToast({
          title: '上传成功',
        })
      })
      wx.navigateBack({ //返回上一页
        delta: 1
      })
    })
  },

  async upedit() {
    await Promise.all([this.upWatchPoster(), this.upWatchHerald(), this.upWatchDrama(), this.upWatchStar()]).then(res => {
      db.collection('watchList').where({
        _id: this.data.watchId
      }).update({
        data: {
          watchName: this.data.watchName, // 电影名字
          synopsis: this.data.synopsis, // 简介
          introduce: this.data.introduce, // 介绍
          watchTime: this.data.watchTime, // 电影时长
          release: this.data.release, // 上映时间
          location: this.data.location, // 上映地点
          watchPoster: this.data.watchPoster, // 海报
          watchHerald: this.data.watchHerald, // 预告片
          watchDrama: this.data.watchDrama, // 剧组照
          watchStar: this.data.watchStar, // 剧组
          watchType: this.data.watchType, // 电影类型
        }
      }).then(res => {
        wx.showToast({
          title: '修改成功',
        })
      })
      wx.navigateBack({ //返回上一页
        delta: 1
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.setData({
        watchId: options.id,
        refer: false
      })
      this.getWatch(this.data.watchId)
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