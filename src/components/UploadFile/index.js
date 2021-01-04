import React, { useState, useEffect } from "react";
import { Upload, Button, Tooltip, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { _uploadFiles, _deleteFiles, _downloadFiles } from "../../Api/fileApi";
import dayjs from "dayjs";
import Axios from "axios";
// import { getItem } from "../../utils/common";

function UploadFile({
  tip,
  upTitle,
  onChange,
  value,
  operation,
  limit,
  showUploadList,
}) {
  // let userData = { token: "" };
  // if (getItem("userData")) {
  //   userData = getItem("userData");
  // }
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (value && value.length > 0) {
      let array = [];
      array = value.map((item) => {
        return {
          uid: item.uid,
          name: item.name,
          response: {
            data:{
              attachmentId: item.response?item.response.data.attachmentId:item.uid
            }
          },
          status: "done",
          url: "",
        };
      });
      setFileList(array);
    }
  }, [value]);

  // 上传事件(状态有uploading、done、error、removed)
  function onUploadChange(info) {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-limit);
    setFileList(fileList);
    if (info.file.status === "done") {
      onChange(fileList);
    }
  }

  /**
   *   删除文件操作
   */
  function deleteFile(attachmentId) {
    if (!operation) {
      //新增直接删除
      (async function () {
        _deleteFiles({ businessKey: attachmentId }).then((res) => {
          if (res.success) {
            message.success("删除成功！");
          } else {
            message.info(res.msg);
          }
        });
      })();
    }
  }

  function onUploadMove(file) {
    if (file.response) {
      let attachmentId = file.response.data.attachmentId;
      deleteFile(attachmentId);
    } else {
      message.info("删除失败");
    }
  }

  // 预览图片

  function onPreview(file) {
    if (file) {
      const { response, name } = file;
      (function download() {
        Axios({
          method: "get",
          url: _downloadFiles(),
          params: { businessKey: response.data.attachmentId },
          responseType: "blob",
        }).then((res) => {
          let blob = new Blob([res.data], {
            type: res.data.type,
          });
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          const currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
          downloadElement.href = href;
          downloadElement.download = `${currentTime}-${name}`; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放blob对象
        });
      })();
    }
  }

  return (
    <Upload
      action={_uploadFiles()}
      // headers={{ Authorization: userData.token }}
      onChange={onUploadChange}
      onRemove={onUploadMove}
      onPreview={onPreview}
      fileList={fileList}
      showUploadList={showUploadList}
    >
      <Tooltip title={tip ? tip : ""}>
        <Button type="primary" htmlType="button" style={{ minWidth: 80 }}>
          <UploadOutlined />
          {upTitle}
        </Button>
      </Tooltip>
    </Upload>
  );
}

export default UploadFile;
