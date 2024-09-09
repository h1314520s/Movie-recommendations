// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    watchType,
    pageIndex,
    pageSize
  } = event
  const db = cloud.database()

  const watchList = db.collection('watchList')

  if (watchType == 'all') {
    const { data } = await watchList
      .limit(pageSize)
      .skip((pageIndex - 1) * pageSize)
      .get()

    return {
      data
    }

  } else {
    const { data } = await watchList
      .where({
        watchType
      })
      .limit(pageSize)
      .skip((pageIndex - 1) * pageSize)
      .get()

    return {
      data
    }
  }


}