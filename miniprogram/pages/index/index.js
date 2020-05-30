// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  name: 'App',
  data: {
    active: 0,
    tabBarList: [],
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png',
    },
    productRecommend:
    [
      {
        img:"../images/index/拉伸.jpg",
        title:"五分钟跑后拉伸"
      },
      {
        img:"../images/index/瑜伽.jpg",
        title:"瑜伽初级"
      }   
    ],
   
    comGroup:
    [
      {
        img:"../images/index/拉伸组1.jpg",
        title:"拉伸1组"
      },
      {
        img:"../images/index/拉伸组2.jpg",
        title:"拉伸2组"
      },
      {
        img:"../images/index/跑步组1.jpg",
        title:"跑步2组"
      },
      {
        img:"../images/index/跑步组2.jpg",
        title:"跑步2组"
      },
      {
        img:"../images/index/拉伸组2.jpg",
        title:"拉伸3组"
      },
    ],

  },

  onChange(event) {
    this.setData({ active: event.detail });
  },

  toMyGrade(options)
  {
    wx.navigateTo({
      url: '../myGrade/myGrade',
    })
  },

  toMyClass(options)
  {
    wx.navigateTo({
      url: '../myClass/myClass',
    })
  },

  toMyGroup(options)
  {
    wx.navigateTo({
      url: '../myGroup/myGroup',
    })
  },

  toMyWork(options)
  {
    wx.navigateTo({
      url: '../myWork/myWork',
    })
  },

  toCourse(options)
  {
    wx.navigateTo({
      url: '../course/course',
    })
  },
 

  toMy(options)
  {
    wx.navigateTo({
      url: '../My/My',
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