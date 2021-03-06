// miniprogram/pages/myClass/myClass.js
const app=getApp();
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
        currIdx: 1,
        select: 2,
        imgs:true,
        list:[],
        list1:[],

        allCourse:[
          {
             imgSrc:"../images/index/拉伸组1.jpg",
             title:'五分钟拉伸',
             time:'5',
             isFinish:true,
             creator:"1",
             id:"65",
             date:"11:23"
          },
          {  
            imgSrc:"../images/index/拉伸组2.jpg",
             title:'十分钟拉伸',
             time:'10',
             isFinish:false,
             creator:"1",
             id:"67",
             date:"11:23"
          }
        ]

  },
      selectTab: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            currIdx: e
        }), this.onShow();
    },
  
    toNew: function(options)
    {
      wx.navigateTo({
        url: './newClass/index',
      })
    },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    db.collection('finishedVideo').where({uid:app.globalData.usrId}).get({
      success:function(res) {
        console.log(res)
        that.setData({ 
          list:res.data
        })   
      }
    })
    
    db.collection('video').where({publisherId:app.globalData.usrId}).get({
      success:function(res) {
        console.log(res)
        that.setData({ 
          list1:res.data
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