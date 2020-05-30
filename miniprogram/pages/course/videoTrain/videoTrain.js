// miniprogram/pages/course/videoTrain/videoTrain.js
const db=wx.cloud.database
({env:'aisport-ntl8l'})
const _=db.command
wx.cloud.init({env:'aisport-ntl8l'})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:'',
    videoTitle:'',
    id:'',
    items:[]

  },
 
  /**
   * 生命周期函数--监听页面加载
   */

  toEndTrain:function(options)
  {
     wx.navigateTo({
       url: '../endTrain/index',
     })
  },
  onLoad: function (options) {
    var that =this;
      db.collection('video').get({
        success:function(res) {
          console.log(res.data);
          console.log(res.data[0].video)
          that.setData({
            items: res.data,  
            videoUrl:res.data[0].video,
            videoTitle:res.data[0].introduce,
            id:res.data[0]._id
          })
        }
      })
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