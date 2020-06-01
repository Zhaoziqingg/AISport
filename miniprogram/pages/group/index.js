// miniprogram/pages/group/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_name: '',
    allGroup:[
      {
         imgSrc:"../images/index/拉伸组1.jpg",
         title:'拉伸运动组',
         time:'5',
         isFinish:true,
         creator:"1",
         id:"65",
         date:"11:23"
      },
      {  
        imgSrc:"../images/index/拉伸组2.jpg",
         title:'瑜伽运动组',
         time:'10',
         isFinish:false,
         creator:"1",
         id:"67",
         date:"11:23"
      }
    ],
  },
      onChange(e) {
        this.setData({
          value: e.detail,
        });
      },
      onSearch() {
        Toast('搜索' + this.data.value);
      },
      onClick() {
        Toast('搜索' + this.data.value);
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