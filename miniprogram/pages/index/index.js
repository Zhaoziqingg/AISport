// miniprogram/pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  name: 'App',
  data: {
    active: 0,
    tabBarList: [],
    avatarUrl:'',
    nickName:'',
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
  toVideoTrain(options)
  {
    wx.navigateTo({
      url: '../course/videoTrain/videoTrain',
    })
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
 
  toGroup(options)
  {
    wx.navigateTo({
      url: '../group/index',
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
           //获取openID
           wx.cloud.callFunction({
             name:'login',
             data:{},
             success: res => {
              //console.log('user openid: ', res.result.openid)
              app.globalData.usrId = res.result.openid
              console.log(app.globalData.usrId)
            },
            fail: err => {
              console.error('[云函数] [login] 调用失败', err)
            }
           })
            
              // 获取用户信息
              wx.getSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                      success: res => {
                        console.log(res.userInfo)
                        app.globalData.nickName = res.userInfo.nickName
                        app.globalData.avatarUrl = res.userInfo.avatarUrl
                       
                      },
                      fail: function (res) {
                        console.log(res);
                        wx.showToast({
                          title: '网络错误，请稍后重试',
                          icon:'none',
                        })
                      }
                    })
                  }
                  else {
                    wx.redirectTo({
                      url: '../login/login',
                    })
                  }
                },
                fail:(res) => {
                  console.log(res);
                  wx.showToast({
                    title: '网络错误，请稍后重试',
                    icon: 'none',
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