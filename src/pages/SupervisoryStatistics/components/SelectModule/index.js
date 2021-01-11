import React from "react";
import { Form, Button, DatePicker, Row, Col, Space } from "antd";
const { RangePicker } = DatePicker;

const SelectModule = () => {
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
        <Form.Item name="rangePicker" label="统计区间">
          <RangePicker />
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

export default SelectModule;
