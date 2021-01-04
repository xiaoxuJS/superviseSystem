import React from "react";
import { Form, Input, Button, Select, DatePicker, Row, Col } from "antd";
import dayjs from 'dayjs'

const { Option } = Select;
const { RangePicker } = DatePicker;

const SelectSupervise = () => {
  //督办事项搜索
  const onFinish = (values) => {
    const data = {
      startData: dayjs(values.rangePicker[0]).format('YYYY-MM-DD'),
      endData: dayjs(values.rangePicker[1]).format('YYYY-MM-DD'),
      select: values.select,
      username: values.username
    }
    console.log(data)
    //督办事项搜索
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
        <Col span={6}>
          <Form.Item label="任务名称" name="username">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="rangePicker" label="完成时限">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="select" label="主办单位" hasFeedback>
            <Select placeholder="请选择主办单位">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="select" label="督办状态" hasFeedback>
            <Select placeholder="请选择督办状态">
              <Option value="china">未立项</Option>
              <Option value="usa">办理中</Option>
              <Option value="usa">已办结</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={20}></Col>
        <Col span={4}>
          <Form.Item {...tailLayout}>
            <Button>重置</Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default SelectSupervise;
