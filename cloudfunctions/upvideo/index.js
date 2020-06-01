const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve,reject)=>{

  console.log(event)
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const _ = db.command;

  const visdeodb = db.collection('video');
  const { OPENID } = cloud.getWXContext()

  videodb.add({
    data: {
      shareId: event.shareId,
      duration:event.duration,
      title:event.title,
      createTime: db.serverDate(),
      avatar: event.avatarUrl,
      publisher: event.nickName,
      group_name:event.group_name,
      isFinish:event.isFinish,
    }
  })
 .then((res)=>{
      resolve(commentId);
    }).catch(reject)

  const result = await cloud.openapi.customerServiceMessage.send({
    touser: OPENID,
    msgtype: 'text',
    text: {
      content: '收到：' + event.Content,
    }
  })

  console.log(result)

  return result
})
