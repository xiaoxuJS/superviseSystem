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
  const [startTime, setStartTime] = useState(dayjs().subtract(30, "day").format("YYYY-MM-DD"));
  const [endTime, setEndTime] = useState(dayjs().format("YYYY-MM-DD"));
  const handleList = useCallback(() => {
    let selectValue = {        
      startTime,
      endTime
    };
    (async () => {
      const { success, data } = await superviseStatistics(selectValue);
      if (success) {
        setData(data)
      }
    })();
  }, [endTime, startTime]);
  useEffect(() => {
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

  const handleSelectModule = (values) => {
    const {rangePicker} = values;
    setStartTime(dayjs(rangePicker[0]).format("YYYY-MM-DD"));
    setEndTime(dayjs(rangePicker[1]).format("YYYY-MM-DD"))
  }
  return (
    <SupervisoryStatisticsBox>
      <PageHeader ghost={false} title="督办统计" />
      <Divider />
      <SelectModule handleSelectModule = {handleSelectModule}/>
      <Divider />
      <Title level={5}>{startTime}~{endTime} </Title>
      <Table columns={columns} dataSource={data} size="small" bordered rowKey = 'departmentName' />
    </SupervisoryStatisticsBox>
  );
};

export default SupervisoryStatistics;
