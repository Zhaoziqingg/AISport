// miniprogram/pages/myGroup/myGroup.js
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
    show:false,
    groupid:'',
    code:'',
    intro:'',
    cover:'',
 
    groupName:'',
    list2:[],
    list1:[],
    
   

  },
      showPopup() {
        this.setData({ show: true });
      },
      input1: function (e) {
        this.setData({ code: e.detail.value });
      },
      onClose() {
        this.setData({ show: false });
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
          url: './newGroup/index',
        })
      },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
 
    db.collection('group').where({publisherId:app.globalData.usrId}).get({
    success:function(res) {
      //console.log("我创建的组",res.data)
      that.setData({ 
        list2:res.data,
      })
     
    }
  })

  db.collection('myGroup').where({uid:app.globalData.usrId}).get({
    success:function(res) {
      //console.log("我创建的组",res.data)
      that.setData({ 
        list1:res.data,
      })
     
    }
  })
  },
  sub()
  {
    var that =this;
    db.collection("group").where({invitation_code: that.data.code}).get({
      success:function(res) {
        console.log("目标运动组",res)
        that.setData({ 
          groupid:res.data[0]._id,
          cover:res.data[0].coverPath,
          groupName:res.data[0].name,
          intro:res.data[0].intro,
        })
        db.collection("myGroup").add({
          data:{
            groupid:that.data.code,
            cover:that.data.cover,
            intro:that.data.intro,
            name:that.data.groupName,
            uid:app.globalData.usrId
          },
        }).then((res) => {
          wx.showToast({
            title: '提交成功',
          });  
        })    
      }
    })
    this.setData({ show: false });
    
    
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