// miniprogram/pages/group/groupDetail/groupDetaile.js
const db=wx.cloud.database()
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    id:'',
    items:[],
    intro:'',
    cover:'',
    allCourse:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    db.collection('group').where({_id:app.globalData.groupId}).get({
      success:function(res) {
        console.log(res)
        that.setData({ 
          cover:res.data[0].coverPath,
          name:res.data[0].name,
          intro:res.data[0].intro,
          publisher:res.data[0].publisher
        })
        //console.log(that.data.intro)
        db.collection('video').where({group_name:that.data.name}).get({
          success:function(res) {
           // console.log("8756454",res)
            that.setData({ 
              allCourse:res.data
            }) 
          }
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