import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  PageHeader,
  Divider,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Table,
  Tag,
  Space,
} from "antd";
import { SuperviseApplyBox } from "./style.js";

const { Option } = Select;

/**
 * 督办事项申请
 */

const SuperviseLead = () => {
  const history = new useHistory();
  const [menu, setMenu] = useState(null);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <span>Invite {record.name}</span>
          <span>Delete</span>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  useEffect(() => {
    console.log(sessionStorage.getItem("menu"));
    setMenu(sessionStorage.getItem("menu"));

    return () => {
      sessionStorage.removeItem("menu");
    };
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <SuperviseApplyBox>
      <PageHeader
        ghost={false}
        onBack={() => history.go("-1")}
        title="督办事项申请"
      />
      <Divider />
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

        {menu === "/superviseManage" ? (
          <Col span={24}>
            <Form
              // {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item name={["user", "introduction"]} label="任务来源">
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="select" label="主办单位" hasFeedback>
                <Select placeholder="请选择督办状态">
                  <Option value="china">未立项</Option>
                  <Option value="usa">办理中</Option>
                  <Option value="usa">已办结</Option>
                </Select>
              </Form.Item>
              <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  确认提交
                </Button>
              </Form.Item>
            </Form>
          </Col>
        ) : null}
      </Row>
      {menu === "/projectAudit" ? (
        <Row>
          <Col span={24}>办理信息</Col>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>

          <Col span={24}>办理意见</Col>
          <Col span={24}>任务来源：</Col>

          <Col span={24}>院领导意见</Col>
          <Col span={24}>
            <Input.TextArea />
          </Col>
          <Col span={24}>
            <Button type="primary">暂存</Button>
            <Button>通过</Button>
            <Button type="dashed">驳回</Button>
            <Button type="text">驳回指定节点</Button>
            <Button type="link">返回</Button>
          </Col>
        </Row>
      ) : null}
    </SuperviseApplyBox>
  );
};

export default SuperviseLead;
