const app = getApp();
/**
 * @typedef File
 * @property {string} _id - 文件ID 
 * @property {date} createTime - 文件创建时间
 * @property {boolean} isVideo - 是否为视频
 * @property {string} title - 文件名
 * @property {string} cloudpath - 文件云文件ID
 * @property {number} size - 文件大小，单位字节
 */

 /**
 * @typedef ErrorMsg
 * @property {string} errMsg - 错误信息
 * @property ...
 */

function is_video(suffix) {
  let regex = /^.(mp4|flv|gif|jpg|png)$/
  return regex.test(suffix.toLowerCase());
}


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
 * {@link DirectoryService~fetch} 拉取更多目录数据
 * {@link DirectoryService~upload} 上传文件
 * {@link DirectoryService~rename} 重命名文件
 * {@link DirectoryService~remove} 移除文件
 */

export default class DirectoryService{
  /**
   * @constructor
   * @param {Object} option
   * @param {function(Array<File>)} option.onFileListChange - 函数调用成功修改数据后的监听器
   * @param {function(ErrorMsg)} option.onFail - 函数调用失败的监听器
   */
  constructor({
    onFileListChange = ()=>{},
    onFail = ()=>{}
  }){
    this._setup(onFileListChange,onFail);
    wx.cloud.init();
    this._fetching = false;
  }

  _fileChanged() {
    this.onFileListChange(this._getData())
  }

  _setup(onFileListChange,onFail){
    this.onFileListChange = onFileListChange;
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
   * 新建课程，有多个请调用多次
   * @param {Object} options
   * @param {string} options.filePath - 视频路径
   * @param {string} options.coverPath - 封面路径
   * @param {string} options.publisher - 发布者名字
   * @param {string} options.title - 课程标题
   * @param {string} options.introduce - 课程简介
   * @param {string} options.group_name - 所属运动组
   * @param {string} options.duration - 时间
   *@param {string} options.person_num - 完成人数
   * @param {function} options.success - 成功回调
   * @param {function} options.fail - 失败回调，会覆盖初始设置的onFail监听器
   */

  upload({
    filePath,
    coverPath,
    title,
    introduce,
    group_name,
    duration,
    success=null,
    fail=null
  }){ 
    let suffix = getSuffix(filePath);
    let fileID = generateUUID();
    const db = wx.cloud.database();
    const filedb = db.collection('video');
    let fileSize = null;
    getFileInfo(filePath)
    .then(res => {
      fileSize = res.size;
      return wx.cloud.uploadFile({
        cloudPath: fileID + suffix,
        filePath: filePath
      });
    }).then(res=>{
      return filedb.add({
        data: {
          filename: getNowFormatDate() + suffix,
          cloudpath: res.fileID,
          isVideo:is_video(suffix),
          createTime: db.serverDate(),
          size: fileSize,
          title:title,
          introduce:introduce,
          group_name:group_name,
          duration:duration,
          coverPath:coverPath,
          publisher:app.globalData.nickName,
          publisherId:app.globalData.usrId,
          person_num:0
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
    const filedb = db.collection('video');
    filedb.where({
      createTime: _.lt(lastTimestamp)
    }).orderBy('createTime','desc').get()
    .then(res=>{
      for(var i of res.data){
        console.log(i.createTime);
        i.time = formatDate(i.createTime);
        // console.log(i.createTime.getFullYear()
        // +'-'+i.createTime.getMonth()+'-'+i.createTime.getDate())
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


