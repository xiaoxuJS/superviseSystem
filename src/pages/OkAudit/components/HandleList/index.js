import React, { useEffect, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { superviseLogFinishList } from "../../../../Api/userApi";
import { Table, Space, Button } from "antd";

// 枚举 审核流程
import { statusEnum, currentNodeEnum } from "../../../../utils/enum";
const HandleList = () => {
  const history = new useHistory();
  const [submit1LIst, submit1List] = useState([]);
  const submitLIstFun = useCallback(() => {
    (async () => {
      const { success, data } = await superviseLogFinishList({
        handleStatus: 1,
      });
      if (success) {
        submit1List(data.records);
      }
    })();
  }, []);
  useEffect(() => {
    submitLIstFun();
  }, [submitLIstFun]);
  const columns = [
    {
      title: "#",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "审核流程",
      dataIndex: "taskStatus",
      render: (text) => <span>{statusEnum[text]}</span>,
    },
    {
      title: "办理人",
      dataIndex: "reviewerName",
    },
    {
      title: "节点名称",
      dataIndex: "currentNode",
      render: (text) => <span>{currentNodeEnum[text]}</span>,
    },
    {
      title: "接收时间",
      dataIndex: "acceptTime",
    },
    {
      title: "操作",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleEnterSuperviseApply(record.taskId)}
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];
  const handleEnterSuperviseApply = (id) => {
    sessionStorage.setItem("menu", "/okAudit");
    history.push({ pathname: "/superviseApply", state: { id } });
  };
  return <Table columns={columns} dataSource={submit1LIst} rowKey="id" />;
};

export default HandleList;
