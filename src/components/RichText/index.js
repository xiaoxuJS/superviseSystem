import React from 'react';
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";

import {_downloadFiles, _uploadFiles} from '../../Api/fileApi'

const RochText = ( {handleContentChange, value }) => {
    // 上传文件
    function myUploadFn(param) {
      console.log(_uploadFiles())
      const serverURL = _uploadFiles()
      const xhr = new XMLHttpRequest()
      const fd = new FormData()
      const successFn = (response) => {
          // 假设服务端直接返回文件上传后的地址
          // 上传成功后调用param.success并传入上传后的文件地址
          console.log(JSON.parse(xhr.responseText))
          param.success({
              url: _downloadFiles() + '?attachmentId=' + JSON.parse(xhr.responseText).data.attachmentId,
              meta: {
                  id: JSON.parse(xhr.responseText).data.attachmentId,
                  title: 'xxx',
                  alt: 'xxx',
                  loop: true, // 指定音视频是否循环播放
                  autoPlay: true, // 指定音视频是否自动播放
                  controls: true, // 指定音视频是否显示控制栏
                  poster: 'http://xxx/xx.png', // 指定视频播放器的封面
              }
          })
      }
      const progressFn = (event) => {
          // 上传进度发生变化时调用param.progress
          param.progress(event.loaded / event.total * 100)
      }
      const errorFn = (response) => {
          // 上传发生错误时调用param.error
          param.error({
              msg: 'unable to upload.'
          })
      }
      xhr.upload.addEventListener("progress", progressFn, false)
      xhr.addEventListener("load", successFn, false)
      xhr.addEventListener("error", errorFn, false)
      xhr.addEventListener("abort", errorFn, false)
      fd.append('file', param.file)
      console.log(xhr)
      xhr.open('POST', serverURL, true)
      // const token = sessionStorage.getItem('token')
      // xhr.setRequestHeader("Authorization", token);
      xhr.send(fd)
    }
  
  return (
    <BraftEditor
      style={{ border: "1px solid #bbbbbb" }}
      value = {value}
      onChange={handleContentChange}
      media={{ uploadFn: myUploadFn }}
    />
  )

}

export default RochText;