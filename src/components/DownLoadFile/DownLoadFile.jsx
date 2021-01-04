import React, { Fragment } from "react";
import dayjs from "dayjs";
import Axios from "axios";
import { isArray } from "../../utils/common";
import { _downloadFiles } from "../../server/news";
function DownLoadFile({ fileArray }) {
    //封装下载组件
    function onClick(id, name) {
        (function download() {
            Axios({
                method: "get",
                url: _downloadFiles(),
                params: { attachmentId: id },
                responseType: "blob",
            }).then((response) => {
                let blob = new Blob([response.data], {
                    type: response.data.type,
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
    if (fileArray && isArray(fileArray)) {
        if (fileArray.length > 0) {
            return (
                <Fragment>
                    {fileArray.map((item) => {
                        return (
                            <p
                                style={{ color: "#1890ff", cursor: "pointer" }}
                                key={item.uid}
                                onClick={() => {
                                    onClick(item.attachmentId, item.name);
                                }}
                            >
                                {item.name}
                            </p>
                        );
                    })}
                </Fragment>
            );
        } else {
            return null;
        }
    } else if (fileArray && fileArray.uid) {
        return (
            <p
                style={{ color: "#1890ff", cursor: "pointer" }}
                key={fileArray.uid}
                onClick={() => {
                    onClick(fileArray.uid, fileArray.name);
                }}
            >
                {fileArray.name}
            </p>
        );
    } else {
        return null;
    }
}
export default DownLoadFile;
