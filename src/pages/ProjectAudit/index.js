import React from "react";

import { PageHeader, Divider, Tabs } from "antd";
import {
  ProjectAuditBox
} from './style'

import HandleList from "./components/HandleList";
import TodoList from "./components/TodoList";

const { TabPane } = Tabs;

/**
 * 立项审核
 */

const ProjectAudit = () => {
  return (
    <ProjectAuditBox>
      <PageHeader
        ghost={false}
        title="督办事项申请"
      />
      <Divider />
      <Tabs defaultActiveKey="1">
        <TabPane tab="待办工作" key="1">
          <TodoList />
        </TabPane>
        <TabPane tab="经办工作" key="2">
          <HandleList />
        </TabPane>
      </Tabs>
    </ProjectAuditBox>
  );
};

export default ProjectAudit;
