// miniprogram/pages/course/endTrain/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    comment:'',
    score:5
  },
 

 cmt(r)
 {
   // console.log("打分",r)
    let comment=r.detail.value.value

    //2.1获取数据库的引用
    const db=wx.cloud.database()
    //2.2获取集合的引用
    const fdb = db.collection("finishedVideo")
     //2.3通过集合，向集合内部添加数据
     fdb.add({
      data:{
        vid:app.globalData.videoId,
        vTitle: app.globalData.videoTitle,
        comment:comment,
        score:this.data.score,
        uid:app.globalData.usrId,
        cover:app.globalData.vc,
      },
    }).then((res) => {
      wx.showToast({
        title: '提交成功',
      });
      wx.navigateBack({
        delta: 2
      })
    })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})