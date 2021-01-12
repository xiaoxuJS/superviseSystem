import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { superviseList } from "../../Api/userApi";

import { Divider, Button, Table, Space, PageHeader, message } from "antd";
import { SuperviseMatterBox } from "./style";

import SelectSupervise from "../../components/SelectSupervise";
import filterObjectUndefined from "../../utils/filterObjectUndefined";

/**
 * 督办事项页面 -- 领导督办页面
 */

const SuperviseMatter = () => {
  const history = new useHistory();
  const [data, setData] = useState([]); //获取数据
  // const [total, setTotal] = useState(0); //用户总条数
  // const [pageNum] = useState(1);
  // const [pageSize] = useState(10);
  const handleList = useCallback((values= {}) => {
    (async () => {
      const { success, data } = await superviseList(values);
      if (success) {
        setData(data.records);
        // setTotal(data.total);
      }
    })();
  }, []);

  useEffect(() => {
    handleList();
  }, [handleList]);

  // const pagination = {
  //   current: pageNum,
  //   pageSize,
  //   total,
  //   showTotal: () => `总条数 ${total} 条`,
  //   onChange: (page, pageSize) => {
  //     // console.log(page, pageSize);
  //   },
  // };

  const status = {
    1: "申请中",
    2: "审核中",
    3: "办理中",
    4: "申请办结",
    5: "已完成",
  };
  const columns = [
    {
      title: "#",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "任务名称",
      dataIndex: "taskName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "下达时间",
      dataIndex: "releaseTime",
    },
    {
      title: "完成时限",
      dataIndex: "timeLimit",
    },
    {
      title: "督办状态",
      render: (text, record) => <span>{status[record.status]}</span>,
    },
    {
      title: "操作",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleEnterSuperviseDetails(record.id)}
          >
            查看
          </Button>
          {/* 只有办理中的时候有申请办结 */}
          {record.status === 3 ? (
            <Button
              type="primary"
              onClick={() => handleSuperviseApply(record.id)}
            >
              申请办结
            </Button>
          ) : null}
        </Space>
      ),
    },
  ];
  const handleEnterSuperviseDetails = (id) => {
    sessionStorage.setItem("menu", "/superviseMatter");
    history.push({ pathname: "/superviseDetails", state: { id } });
  };
  const handleSuperviseApply = (id) => {
    sessionStorage.setItem("menu", "/superviseMatter");
    history.push({ pathname: "/superviseApply", state: { id } });
  };

  //获取搜索数据
  const handleSelectCondition = (values) => {
    const data = filterObjectUndefined(values);
    if (JSON.stringify(data) !== "{}") {
      handleList(data);
    } else {
      message.warning("请填写筛选条件！");
    }
  };

  return (
    <SuperviseMatterBox>
      <PageHeader ghost={false} title="督办事项" />
      <Divider />
      <SelectSupervise handleSelectCondition={handleSelectCondition} />
      <Divider />
      <Table
        columns={columns}
        dataSource={data}
        // pagination={pagination}
        rowKey="key"
      />
    </SuperviseMatterBox>
  );
};

export default SuperviseMatter;
