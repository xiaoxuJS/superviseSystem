import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  superviseLogFinishList
} from '../../../../Api/userApi';
import { Table, Space, Button } from 'antd';
// 枚举 审核流程
import {statusEnum, currentNodeEnum} from '../../../../utils/enum'

const TodoList = () => {
  const history = new useHistory();
  const [submit0LIst, submit0List] = useState([]);
  const submitLIstFun = useCallback(() => {
    ;(async () => {
      const {success, data} = await superviseLogFinishList({handleStatus: 0 });
      if( success ) {
        submit0List(data.records)
      }
    })();
  },[])
  useEffect(() => {
submitLIstFun();
  },[submitLIstFun])
  const columns = [
    {
      title: '#',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '审核流程',
      dataIndex: 'taskStatus',
      render: text => <span>{statusEnum[text]}</span>,
    },
    {
      title: '办理人',
      dataIndex: 'reviewerName'
    },
    {
      title: '节点名称',
      dataIndex: 'currentNode',
      render: text => <span>{currentNodeEnum[text]}</span>,
    },
    {
      title: '接收时间',
      dataIndex: 'acceptTime'
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space size="middle">
          <Button type = 'primary' onClick = {() => handleEnterSuperviseApply(record)}>办理</Button>
        </Space>
      ),
    },
  ];

  const handleEnterSuperviseApply = (data) => {
    sessionStorage.setItem('menu', '/okAudit');
    history.push({pathname:'/superviseApply', state: {id: data.taskId, logId:  data.logId}})
  }
  return (
    <Table columns={columns} dataSource={submit0LIst} rowKey = 'id' />
  )
}

export default TodoList;