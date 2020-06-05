// miniprogram/pages/course/videoTrain/videoTrain.js
const db=wx.cloud.database
({env:'aisport-ntl8l'})
const _=db.command
const app = getApp();
wx.cloud.init({env:'aisport-ntl8l'})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:'',
    videoTitle:'',
    id:'',
    items:[],
    time:'',
    person_account:'',
    intro:''

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
      db.collection('video').where({_id:app.globalData.videoId}).get({
        success:function(res) {
          //console.log(res)
          that.setData({ 
            videoUrl:res.data[0].cloudpath,
            videoTitle:res.data[0].title,
            time:res.data[0].duration,
            person_account:res.data[0].person_num,
            intro:res.data[0].introduce
          })
          console.log(that.data.intro)
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