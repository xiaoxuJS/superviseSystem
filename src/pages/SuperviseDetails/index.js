import React from "react";
import { useHistory } from "react-router-dom";
import {
  PageHeader,
  Divider,
  Button,
  Tabs,
  Table, Tag, Space
} from "antd";
import { SuperviseDetailsBox } from "./style.js";

import EssentialValue from '../../components/EssentialValue'
const { TabPane } = Tabs;

const SuperviseDetails = () => {
  const history = new useHistory();
  const callback = (key) => {
    console.log(key);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick = {() => history.push('/reportEvolve')}>修改</Button>
          <Button type="primary">删除</Button>
          <Button type="primary" onClick = {() => history.push('/reportEvolve')}>详情</Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <SuperviseDetailsBox>
      <PageHeader
        ghost={false}
        onBack={() => history.go("-1")}
        title="督办事项"
      />
      <Divider />
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="督办事项" key="1">
          <EssentialValue />
        </TabPane>
        <TabPane tab="任务进展" key="2">
          <Button type="primary" onClick = {() => history.push('/reportEvolve')}>汇报进展</Button>
          <Table columns={columns} dataSource={data} />
        </TabPane>
      </Tabs>
    </SuperviseDetailsBox>
  );
};

export default SuperviseDetails;
