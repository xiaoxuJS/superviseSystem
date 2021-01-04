import React, { Fragment } from "react";
import { Row, Col, Input } from "antd";

/**
 * 基本信息-承办单位-协办单位
 */

const EssentialValue = () => {
  return (
    <Fragment>
      <Row>
        <Col span={24}>基本信息</Col>
        <Col span={12}>任务名称：</Col>
        <Col span={12}>编号：</Col>
        <Col span={12}>任务类型：</Col>
        <Col span={12}>督办状态：</Col>
        <Col span={12}>下达时间：</Col>
        <Col span={12}>完成时限：</Col>
        <Col span={12}>汇报周期：</Col>
      </Row>
      <Row>
        <Col span={24}>承办单位</Col>
        <Col span={12}>单位：</Col>
        <Col span={12}>负责人：</Col>
        <Col span={12}>电话：</Col>
      </Row>
      <Row>
        <Col span={12}>是否公示：</Col>
        <Col span={12}>附件：</Col>
        <Col span={12}>工作内容：</Col>
        <Col span={24}>
          <Input.TextArea />
        </Col>
      </Row>
    </Fragment>
  );
};

export default EssentialValue;
