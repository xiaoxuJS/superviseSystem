import { http, baseUrl} from "./http";

export function _downloadFiles() {
  //文件下载接口
  if (process.env.NODE_ENV === "development") {
    return baseUrl  + "/project/mongo/down-load";
  } else if (process.env.NODE_ENV === "production") {
      // return "https://www.yrihr.com.cn/project/mongo/downLoad"; 
  }
}

export function _uploadFiles() {
  //接口上传文件
  // if (process.env.NODE_ENV === "development") {
      return baseUrl  + "/project/mongo/upload";
  // } else if (process.env.NODE_ENV === "production") {
  //     return "http://" + window.location.host + "/api"  + "/project/mongo/upload";
  // }
}

export function _deleteFiles(data) {
  //附件删除
  const url = baseUrl + "/project/mongo/delete";
  return http(url, "post", data);
}