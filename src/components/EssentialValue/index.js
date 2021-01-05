import React from "react";
import { Row, Col, Typography, Space, Button } from "antd";
import { EssentialValueBox } from "./style.js";

const { Title } = Typography;

/**
 * 基本信息-承办单位-协办单位
 */

const EssentialValue = ({ detailsData }) => {
  return (
    <EssentialValueBox>
      <Title level={5}>基本信息</Title>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={4}>任务名称：</Col>
            <Col span={20}>{detailsData.taskName}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>编号：</Col>
            <Col span={20}>{detailsData.taskNo}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>任务类型：</Col>
            {/* <Col span={20}>{detailsData.status}</Col> */}
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>督办状态：</Col>
            <Col span={20}>{detailsData.status}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>下达时间：</Col>
            <Col span={20}>{detailsData.releaseTime}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>完成时限：</Col>
            <Col span={20}>{detailsData.timeLimit}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>汇报周期：</Col>
            {/* <Col span={20}>{detailsData.}</Col> */}
          </Row>
        </Col>
      </Row>
      <Title level={5}>承办单位</Title>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={4}>主办单位：</Col>
            <Col span={20}>{detailsData.organizer}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>主办单位负责人：</Col>
            <Col span={20}>{detailsData.organizerPerson}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>联系方式：</Col>
            <Col span={20}>{detailsData.organizerMobile}</Col>
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
                  <Col span={4}>单位：</Col>
                  <Col span={20}>{item.dept}</Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={4}>协作单位负责人：</Col>
                  <Col span={20}>{item.chargePerson}</Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={4}>联系电话：</Col>
                  <Col span={20}>{item.telephone}</Col>
                </Row>
              </Col>
            </Row>
          );
        })}

      <Row>
        <Col span={12}>
          <Row>
            <Col span={4}>是否公示：</Col>
            <Col span={20}>{detailsData.publicity}</Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>附件：</Col>
            <Col span={20}>
              <Space>
                {detailsData.attachments &&
                  detailsData.attachments.map((item) => {
                    return <Button type="link">{item.attachmentName}</Button>;
                  })}
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={4}>工作内容：</Col>
            <Col span={20}>
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
