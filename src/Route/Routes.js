import React from "react";

import { 
  DatabaseOutlined,
  FileDoneOutlined,
  FlagOutlined,
  CalendarOutlined,
  ProjectOutlined
} from "@ant-design/icons";
import SuperviseManage from '../pages/SuperviseManage'; //督办管理
import SuperviseMatter from '../pages/SuperviseMatter'; //督办事项
import SuperviseLead from '../pages/SuperviseLead'; //领导督办
import ProjectAudit from '../pages/ProjectAudit'; //立项审核
import OkAudit from '../pages/OkAudit'; //办结审核
import SupervisoryStatistics from '../pages/SupervisoryStatistics'; //督办统计
import SuperviseApply from '../pages/SuperviseApply'; //督办事项申请
import SuperviseDetails from '../pages/SuperviseDetails'; //督办详情
import ReportEvolve from '../pages/ReportEvolve'; //汇报进展


import AddProject from '../pages/AddProject'; //立项

const menuRouter = [
  {
    key: 1,
    meta: {
      title: "督办管理",
      icon: <DatabaseOutlined />,
    },
    path: "/superviseManage",
    component: SuperviseManage,
  },
  {
    key: 2,
    meta: {
      title: "督办事项",
      icon: <FileDoneOutlined />,
    },
    path: "/superviseMatter",
    component: SuperviseMatter,
  },
  {
    key: 3,
    meta: {
      title: "领导督办",
      icon: <FlagOutlined />,
    },
    path: "/superviseLead",
    component: SuperviseLead,
  },
  {
    key: 4,
    meta: {
      title: "立项审核",
      icon: <CalendarOutlined />,
    },
    path: "/projectAudit",
    component: ProjectAudit,
  },
  {
    key: 5,
    meta: {
      title: "办结审核",
      icon: <CalendarOutlined  />,
    },
    path: "/okAudit",
    component: OkAudit,
  },
  {
    key: 6,
    meta: {
      title: "督办统计",
      icon: <ProjectOutlined />,
    },
    path: "/supervisoryStatistics",
    component: SupervisoryStatistics,
  }
];



const userRouter = [
  ...menuRouter, 
  {
    path: "/",
    component: SuperviseManage,
  },
  {
    path: "/addProject",
    component: AddProject,
  },
  {
    path: "/superviseApply",
    component: SuperviseApply,
  },
  {
    path: "/superviseDetails",
    component: SuperviseDetails,
  },
  {
    path: "/reportEvolve",
    component: ReportEvolve,
  }
];

export {
  menuRouter,
  userRouter
};
