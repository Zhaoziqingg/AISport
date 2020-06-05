// miniprogram/pages/myGroup/newGroup/index.js
import GroupService from '../../../service/group_servive'
const app = getApp();
var group = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
     introduce:'',
     invitation_code:'',
     name:'',
     coverPath:'',
     files:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  turn:function(e){
        
    var param = e.currentTarget.dataset.url;
    if(param=='index'){
      this.onLoad();
    }
    else{
      wx.navigateTo({
          url: '../' + param + '/' + param
      })
    }
  },
  onChange(event) {
              // event.detail 为当前输入的值
              console.log(event.detail);
            },
  chooseCover()
  {
    var that=this;
      wx.chooseImage({
        count: 1,
        success:res=>
           {          
           // console.log(res)
            that.setData({
              coverPath:res.tempFiles[0].path                
            })
            
           }
        }) 

},

upfile (r) {
  console.log("r",r)
  this.setData({
    name:r.detail.value.name,
    introduce:r.detail.value.introdece,
    invitation_code:r.detail.value. invitation_code,
  })
    wx.showLoading({
      title: '上传中',
    })
    new Promise((resolve, reject) => {
        var name = this.data.name;
        var introduce = this.data.introduce;
        var  invitation_code = this.data. invitation_code;
        var coverPath = this.data.coverPath;
        group.upload({
          coverPath:coverPath,
          filePath: coverPath,
          name:name,
          invitation_code:invitation_code,
          introduce:introduce,
          success:(res)=>{
            console.log(res);               
              resolve(res);                   
          },
          fail:(res)=>{
            console.log(res);
            wx.showToast({
              title: res.errMsg,
              icon:'none',
            })
          }
        });    
    }).then((res) => {
      wx.showToast({
        title: '上传成功',
      });
      wx.navigateBack({
        delta: 1
      })
    }).catch(console.log)
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
    group = new GroupService({
      onGroupListChange: (res) => {
        this.setData({ files: res });
        app.globalData.grp = this.data.files;
     },
     onFail: (res) => {
       console.log(res);
      }
    })
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