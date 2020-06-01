// miniprogram/pages/myGrade/myGrade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    allCourse:[
      {
         imgSrc:"../../img/拉伸组2.jpg",
         title:'五分钟拉伸',
         time:'5',
         isFinish:true,
         creator:"1",
         id:"65",
         date:"2020/01/03 11:23"
      },
      {  
        imgSrc:"../../img/拉伸组1.jpg",
         title:'十分钟拉伸（简易版）',
         time:'10',
         isFinish:false,
         creator:"1",
         id:"67",
         date:"2020/01/03 11:23"
      }
    ]
  

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