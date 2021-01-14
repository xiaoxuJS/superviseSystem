import React from "react";
import Axios from 'axios';
import {_downloadFiles} from '../../Api/fileApi';
import { Row, Col, Typography, Space, Button } from "antd";
import { EssentialValueBox } from "./style.js";
//枚举
import {statusEnum} from '../../utils/enum'
const { Title } = Typography;

/**
 * 基本信息-承办单位-协办单位
 */

const EssentialValue = ({ detailsData }) => {

  const handleDownloadFiles = (data) => {
    Axios({
      method: "get",
      url: _downloadFiles(),
      params: { attachmentId: data.id },
      responseType: "blob",
  }).then((response) => {
      let blob = new Blob([response.data], {
          type: response.data.type,
      });
      let downloadElement = document.createElement("a");
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      downloadElement.download = `${data.attachmentName}`; //下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放blob对象
  });
  }
  return (
    <EssentialValueBox>
      <Title level={5}>基本信息</Title>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={6}>任务名称：</Col>
            <Col span={16}>{detailsData.taskName}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={6}>编号：</Col>
            <Col span={16}>{detailsData.taskNo}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={6}>任务类型：</Col>
            {/* <Col span={16}>{detailsData.status}</Col> */}
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={6}>督办状态：</Col>
            <Col span={16}>{statusEnum[detailsData.status]}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={6}>下达时间：</Col>
            <Col span={16}>{detailsData.releaseTime}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={6}>完成时限：</Col>
            <Col span={16}>{detailsData.timeLimit}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={6}>汇报周期：</Col>
            {/* <Col span={16}>{detailsData.}</Col> */}
          </Row>
        </Col>
      </Row>
      <Title level={5}>承办单位</Title>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={6}>主办单位：</Col>
            <Col span={16}>{detailsData.organizerName}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={6}>主办单位负责人：</Col>
            <Col span={16}>{detailsData.organizerPersonName}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={6}>联系方式：</Col>
            <Col span={16}>{detailsData.organizerMobile}</Col>
          </Row>
        </Col>
      </Row>
      <Title level={5}>协办单位</Title>
      {detailsData.depList &&
        detailsData.depList.map((item) => {
          return (
            <Row>
              <Col span={12}>
                <Row>
                  <Col span={6}>单位：</Col>
                  <Col span={16}>{item.depName}</Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={6}>协作单位负责人：</Col>
                  <Col span={16}>{item.chargePersonName}</Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={6}>联系电话：</Col>
                  <Col span={16}>{item.telephone}</Col>
                </Row>
              </Col>
            </Row>
          );
        })}

      <Row>
        <Col span={12}>
          <Row>
            <Col span={6}>是否公示：</Col>
            <Col span={16}>{detailsData.publicity}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={6}>附件：</Col>
            <Col span={16}>
              <Space>
                {detailsData.attachments &&
                  detailsData.attachments.map((item) => {
                    return <Button type="link" onClick = {() => handleDownloadFiles(item)}>{item.attachmentName}</Button>;
                  })}
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={3}>工作内容：</Col>
            <Col span={19}>
              <div
                dangerouslySetInnerHTML={{ __html: detailsData.workContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={24}></Col>
      </Row>
    </EssentialValueBox>
  );
};

export default EssentialValue;
