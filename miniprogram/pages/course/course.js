// miniprogram/pages/course/course.js
import DirectoryService from '../../service/directory_service.js'
const app = getApp();
var directory = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[],
  },

  toVideoTrain(e)
  {
    console.log(e)
    app.globalData.videoId=e.currentTarget.dataset.data._id
    app.globalData.videoTitle=e.currentTarget.dataset.data.title
    app.globalData.vc=e.currentTarget.dataset.data.coverPath
   // console.log("1111",app.globalData.videoId)
    wx.navigateTo({
      url: '../course/videoTrain/videoTrain',
    })
  },

  onReachBottom(){
    directory.fetch();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    directory = new DirectoryService({
      onFileListChange: (res) => {
        this.setData({ files: res });   
        app.globalData.myfile = this.data.files;
     },
     onFail: (res) => {
       console.log("res",res);
      }
    })
    directory.fetch();
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