import React from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Divider, Tabs } from "antd";

import HandleList from "./components/HandleList";
import TodoList from "./components/TodoList";

const { TabPane } = Tabs;

/**
 * 立项审核
 */

const ProjectAudit = () => {
  const history = new useHistory();
  const callback = (key) => {
    console.log(key);
  };
  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => history.go("-1")}
        title="任务进展"
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
    </div>
  );
};

export default ProjectAudit;
