import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { superviseStatistics } from "../../Api/userApi";

import { PageHeader, Divider, Typography, Table } from "antd";
import { SupervisoryStatisticsBox } from "./style.js";

import SelectModule from "./components/SelectModule";

const { Title } = Typography;

/**
 * 督办统计
 */

const SupervisoryStatistics = () => {
  const [data, setData] = useState([]);
  const handleList = useCallback((values) => {
    let selectValue = {};
    if (values) {
      selectValue = values;
    } else {
      selectValue = {
        startTime: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
        endTime: dayjs().format("YYYY-MM-DD"),
      };
    }
    (async () => {
      const { success, data } = await superviseStatistics(selectValue);
      if (success) {
        setData(data)
      }
    })();
  }, []);
  useEffect(() => {
    console.log(dayjs().format("YYYY-MM-DD"));
    console.log(dayjs().subtract(30, "day").format("YYYY-MM-DD"));
    handleList();
  }, [handleList]);
  const columns = [
    {
      title: "部门",
      dataIndex: "departmentName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "已完成",
      dataIndex: "finishSum"
    },
    {
      title: "办理中",
      dataIndex: "processingSum"
    },
    {
      title: "办结中",
      dataIndex: "finishingSum"
    },
    {
      title: "已逾期（未完成）",
      dataIndex: "overdueSum"
    },
    {
      title: "总数",
      dataIndex: "total"
    },
  ];
  return (
    <SupervisoryStatisticsBox>
      <PageHeader ghost={false} title="督办统计" />
      <Divider />
      <SelectModule />
      <Divider />
      <Title level={5}>h5. Ant Design</Title>
      <Table columns={columns} dataSource={data} size="small" bordered rowKey = 'departmentName' />
    </SupervisoryStatisticsBox>
  );
};

export default SupervisoryStatistics;
