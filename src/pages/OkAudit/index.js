import React from "react";
import { useHistory } from "react-router-dom";


import { PageHeader, Divider, Tabs } from "antd";
import {
  OkAuditBox
} from './style'

import HandleList from "./components/HandleList";
import TodoList from "./components/TodoList";

const { TabPane } = Tabs;
/**
 * 办结审核
 */

const OkAudit = () => {
  const history = new useHistory();

  const callback = (key) => {
    // console.log(key);
  };
  return (
    <OkAuditBox>
      <PageHeader
        ghost={false}
        title="申请办结"
      />
      <Divider />
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="待办工作" key="1">
          <TodoList />
        </TabPane>
        <TabPane tab="经办工作" key="2">
          <HandleList />
        </TabPane>
      </Tabs>
    </OkAuditBox>
  );
}

export default OkAudit;