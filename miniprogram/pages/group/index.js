// miniprogram/pages/group/index.js

import GroupService from '../../service/group_servive'
const app = getApp();
var group = null;



Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[],
  },
      
      
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    group = new GroupService({
      onGroupListChange: (res) => {
       // console.log(res)
        this.setData({ files: res });
        app.globalData.grp = this.data.files;
     },
     onFail: (res) => {
       //console.log(res);
      }
    })
    group.fetch();
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