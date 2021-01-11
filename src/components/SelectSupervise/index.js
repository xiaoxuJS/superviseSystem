import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Row, Col, Space } from "antd";
import dayjs from "dayjs";
import { superviseList } from "../../Api/messageApi";

const { Option } = Select;
const { RangePicker } = DatePicker;

const SelectSupervise = ({ handleSelectCondition }) => {
  const [form] = Form.useForm();
  const { resetFields } = form;
  const [depData, setDepData] = useState([]);
  useEffect(() => {
    (async () => {
      const { success, data } = await superviseList();
      if (success) {
        setDepData(data);
      }
    })();
  },[]);
  //督办事项搜索
  const onFinish = (values) => {
    const data = {
      startTime:
        values.rangePicker && dayjs(values.rangePicker[0]).format("YYYY-MM-DD"),
      endTime:
        values.rangePicker && dayjs(values.rangePicker[1]).format("YYYY-MM-DD"),
      unit: values.select,
      name: values.username,
    };
    handleSelectCondition(data);
    //督办事项搜索
  };
  return (
    <Form
      {...layout}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
    >
      <Row>
        <Col span={8}>
          <Form.Item label="任务名称" name="username">
            <Input placeholder="请输入任务名称" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="rangePicker" label="完成时限">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="select" label="主办单位" hasFeedback>
            <Select placeholder="请选择主办单位">
              {depData
                ? depData.map((item) => {
                    return (
                      <Option key={item.departmentId} value={item.departmentId}>
                        {item.departmentName}
                      </Option>
                    );
                  })
                : null}
            </Select>
          </Form.Item>
        </Col>
        {/* <Col span={6}>
          <Form.Item name="select" label="督办状态" hasFeedback>
            <Select placeholder="请选择督办状态">
              <Option value="china">未立项</Option>
              <Option value="usa">办理中</Option>
              <Option value="usa">已办结</Option>
            </Select>
          </Form.Item>
        </Col> */}
      </Row>
      <Row>
        <Col span={20}></Col>
        <Col span={4}>
          <Form.Item {...tailLayout}>
            <Space>
              <Button onClick={() => resetFields()}>重置</Button>
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
