import React from "react";
import { Form, Input, Button, Select, DatePicker, Row, Col, Space } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const SelectSupervise = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row>
        <Col span={8}>
          <Form.Item label="任务名称" name="username">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="range-picker" label="完成时限">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="select" label="主办单位" hasFeedback>
            <Select placeholder="请选择主办单位">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>
        </Col>
       
      </Row>
      <Row>
        <Col span={20}></Col>
        <Col span={4}>
          <Form.Item {...tailLayout}>
            <Space>
              <Button>重置</Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Space>
            
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default SelectSupervise;
