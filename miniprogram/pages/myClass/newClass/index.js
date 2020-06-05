// miniprogram/pages/myClass/newClass/index.js
import DirectoryService from '../../../service/directory_service.js'
const app = getApp();
var directory = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logged: false,
    takeSession: false,
    requestResult: '',
    filepath:'',
    coverPath:'',
    title:'',
    group_name:'',
    introduce:'',
    duration:'',
    
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
    upfile (r) {
                  console.log("r",r)
                  this.setData({
                    title:r.detail.value.title,
                    introduce:r.detail.value.introdece,
                    duration:r.detail.value.duration,
                  })
                    wx.showLoading({
                      title: '上传中',
                    })
                    new Promise((resolve, reject) => {
                        var path = this.data.filepath;
                        var title = this.data.title;
                        var introduce = this.data.introduce;
                        var duration = this.data.duration;
                        var coverPath = this.data.coverPath;
                        directory.upload({
                          coverPath:coverPath,
                          filePath: path,
                          title:title,
                          group_name:"瑜伽",
                          introduce:introduce,
                          duration:duration,
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
      chooseVideo()
                {
                  var that=this;
                    wx.chooseMessageFile({
                      count: 1,
                      type: 'all',
                      success:res=>
                         {          
                          //console.log(res)
                          that.setData({
                            filepath:res.tempFiles[0].path
                          })
                         }
                      }) 
        
      },
      chooseCover()
      {
        var that=this;
          wx.chooseImage({
            count: 1,
            type: 'all',
            success:res=>
               {          
               // console.log(res)
                that.setData({
                  coverPath:res.tempFiles[0].path                
                })
                
               }
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
  onShow() {
    directory = new DirectoryService({
      onFileListChange: (res) => {
       console.log("111");
        this.setData({ files: res });
        app.globalData.myfile = this.data.files;
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