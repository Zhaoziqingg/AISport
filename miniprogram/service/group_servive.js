const app = getApp();


 /**
 * @typedef ErrorMsg
 * @property {string} errMsg - 错误信息
 * @property ...
 */


function formatDate(t){
  var date = new Date(t);
  var fmt = 'yyyy-MM-dd hh:mm:ss';
  var o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 生成UUID
 * @return {string} 生成的UUID
 */

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}


/**
 * 获取格式化的当前时间
 * @return {string}
 */
function getNowFormatDate() { //author: meizz
  var date = new Date();
  var fmt='yyyy-MM-dd hhmmss';   
  var o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
} 

/**
 * 获取文件名的后缀
 * @param {string} filename 文件名
 * @return {string} 返回文件名后缀
 */

function getSuffix(filename){
  let dotIndex = filename.lastIndexOf('.');
  if(dotIndex==-1){
    return '';
  }
  return filename.substr(dotIndex)
}

/**
 * 封装promise
 */
function getFileInfo(filePath){
  return new Promise((resolve,reject)=>{
    wx.getFileInfo({
      filePath: filePath,
      success:resolve,
      fail:reject
    })
  });
}

/**
 * 提供用户私有目录相关服务
 * {@link GroupService~fetch} 拉取更多目录数据
 * {@link GroupService~upload} 上传信息
 */

export default class DGroupService{
  /**
   * @constructor
   * @param {Object} option
   * @param {function(Array<File>)} option.onGroupListChange - 函数调用成功修改数据后的监听器
   * @param {function(ErrorMsg)} option.onFail - 函数调用失败的监听器
   */
  constructor({
    onGroupListChange = ()=>{},
    onFail = ()=>{}
  }){
    this._setup(onGroupListChange,onFail);
    wx.cloud.init();
    this._fetching = false;
  }

  _fileChanged() {
    this.onGroupListChange(this._getData())
  }

  _setup(onGroupListChange,onFail){
    this.onGroupListChange = onGroupListChange;
    this.onFail = onFail
    return this;
  }

  setFilter(filter){
    this.filter = filter;
  }

  _getData() {
    if (this._data == undefined || this._data == null) {
      this._data = [];
    }
    return this._data;
  }


   /**
   * 新建运动组
   * @param {Object} options
   * @param {string} options.coverPath - 封面路径
   * @param {string} options.publisher - 发布者名字
   * @param {string} options.introduce - 课程简介
   * @param {string} options.name - 运动组名字
   * @param {string} options.invitation_code -邀请码
   * @param {function} options.success - 成功回调
   * @param {function} options.fail - 失败回调，会覆盖初始设置的onFail监听器
   */

  upload({
    coverPath,
    introduce,
    name,
    invitation_code,
    success=null,
    fail=null
  }){ 
    let suffix = getSuffix(coverPath);
    let fileID = generateUUID();
    const db = wx.cloud.database();
    const filedb = db.collection('group');
    getFileInfo(coverPath)
    .then(res => {
      return wx.cloud.uploadFile({
        cloudPath: fileID + suffix,
        filePath: coverPath
      });
    }).then(res=>{
      return filedb.add({
        data: {
          cloudpath: res.fileID,
          createTime: db.serverDate(),
          introduce:introduce,
          name:name,
          coverPath:coverPath,
          invitation_code:invitation_code,
          publisher:app.globalData.nickName,
          publisherId:app.globalData.usrId
        }
      })
    }).then(res=>{
      return filedb.doc(res._id).get();
    }).then(res=>{
      res.data.time = formatDate(res.data.createTime);
    
      this._getData().unshift(res.data);
      this._fileChanged();
      success(res);
    }).
    catch(fail==null?this.onFail:fail);
  }
  

   /**
   * 拉取20条文件数据并入当前数组
   */
  fetch(){
    if(this._fetching){
      this.onFail({
        errMsg:'请等待上次的查询'
      })
      return;
    }
    this._fetching = true;
    let data = this._getData();
    let lastTimestamp = null;
    if(data.length!=0){
      lastTimestamp = data[data.length-1].createTime;
    }else{
      lastTimestamp = new Date()
    }
    const db = wx.cloud.database();
    const _ = db.command;
    const filedb = db.collection('group');
    filedb.where({
      createTime: _.lt(lastTimestamp)
    }).orderBy('createTime','desc').get()
    .then(res=>{
      for(var i of res.data){
        console.log(i.createTime);
        i.time = formatDate(i.createTime);
      }
      this._data = data.concat(res.data);
      this._fetching = false;
      this._fileChanged();
    })
    .catch(res=>{
      this._fetching = false;
      this.onFail(res);
    });
  }
}


