import React from "react";

import { Typography, Divider, Button, Table, Tag, Space } from "antd";

import SelectSupervise from "./components/SelectSupervise";

const { Title } = Typography;

const SuperviseMatter = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "name",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "任务名称",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "下达时间",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "完成时限",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "督办状态",
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
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" >
            查看
          </Button>
          <Button type="primary">申请办结</Button>
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

  return (
    <div>
      <Title level={2}>督办事项管理</Title>
      <Divider />
      <SelectSupervise />
      <Divider />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default SuperviseMatter;
