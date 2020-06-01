// miniprogram/pages/myClass/newClass/index.js
import DirectoryService from '../../../service/directory_service.js'
const app = getApp();
var directory = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    files:[],
    src:''

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
      upfile: function (r) {
                  console.log(r);
                  wx.showLoading({
                    title: '上传中',
                  });
                  new Promise((resolve, reject) => {
                      var path = this.data.src;
                      directory.upload({
                        filePath: path,
                        success:(res)=>{
                          console.log(res);               
                            console.log(path);
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
                    // this.setData({files:[]});
                    // this.onLoad();
                  }).catch(console.log)
                },
      chooseVideo:function()
            {
              var that =this
              new Promise((success, fail) => {
                wx.chooseMessageFile({
                  count: 1,
                  type: 'all',
                  success: function(res) {
                    that.setData({
                      src: res.tempFileUrl,      
                    })
                    console.log(src)
                  },
                  fail,
                });
            }).then((r) => {
              console.log('Done: ' + r);   
            // this.upfile(r);
            })//.catch((r) => {
             // wx.showToast({
               // title: '上传失败',
               // icon:'none'
             // })
             // console.log('Failed: ' + r);
           // });

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