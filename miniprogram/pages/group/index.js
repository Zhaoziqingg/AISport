// miniprogram/pages/group/index.js

import GroupService from '../../service/group_servive'
import SearchService from '../../service/group_servive'
const app = getApp();
var group = null;
const db = wx.cloud.database();
var service = new SearchService({
  onShareListChange: () => { },
  onFail: () => { }
});


Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[],
    value:'',
    choose: true,
    active: 0,
    list:[],
    list1:[],
    t:[],
  },
      
     // 时间戳转时间
  formatDate(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    group = new GroupService({
      onGroupListChange: (res) => {  
        that.setData({
           t: res, 
           list:res,
        });
     },
     onFail: (res) => {
      }
    })
    group.fetch();
    
    
  },

    // 绑定搜索框值
    onChange(e){
      this.setData({
        value:e.detail
      })
    },
  // 点击搜索
  onSearch(e) {
   // console.log("value",this.data.value);
   if(this.data.value=='')
   {
     this.setData(
     {
       list:t
     });
     formatDate(list.creatTime)
   }else{
    db.collection("group").where({
      name:this.data.value,
    }).get({
      success:res=>{
        console.log("成功",res)
        this.setData
        ({
          list:res.data
        })
        
      },
    })
  }
  },


  // 点击搜索结果
  turn(e) {
    // console.log('aaaa');
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../comment/comment?shareId=' + e.currentTarget.dataset.id
    })
  },
  toGroupDetail(e)
  {
    console.log(e)
    app.globalData.groupId=e.currentTarget.dataset.data._id
    wx.navigateTo({
      url: '../group/groupDetail/groupDetaile',
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