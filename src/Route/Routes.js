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
import TaskEvolve from '../pages/TaskEvolve'; //任务进展


import AddProject from '../pages/AddProject'; //立项

const menuRouter = [
  {
    key: 1,
    meta: {
      title: "督办管理",
      icon: <DatabaseOutlined />,
    },
    path: "/home/superviseManage",
    component: SuperviseManage,
  },
  {
    key: 2,
    meta: {
      title: "督办事项",
      icon: <FileDoneOutlined />,
    },
    path: "/home/superviseMatter",
    component: SuperviseMatter,
  },
  {
    key: 3,
    meta: {
      title: "领导督办",
      icon: <FlagOutlined />,
    },
    path: "/home/superviseLead",
    component: SuperviseLead,
  },
  {
    key: 4,
    meta: {
      title: "立项审核",
      icon: <CalendarOutlined />,
    },
    path: "/home/projectAudit",
    component: ProjectAudit,
  },
  {
    key: 5,
    meta: {
      title: "办结审核",
      icon: <CalendarOutlined  />,
    },
    path: "/home/okAudit",
    component: OkAudit,
  },
  {
    key: 6,
    meta: {
      title: "督办统计",
      icon: <ProjectOutlined />,
    },
    path: "/home/supervisoryStatistics",
    component: SupervisoryStatistics,
  }
];



const userRouter = [
  ...menuRouter, 
  {
    path: "/home",
    component: SuperviseManage,
  },
  {
    path: "/home/addProject",
    component: AddProject,
  },
  {
    path: "/home/superviseApply",
    component: SuperviseApply,
  },
  {
    path: "/home/superviseDetails",
    component: SuperviseDetails,
  },
  {
    path: "/home/reportEvolve",
    component: ReportEvolve,
  },
  {
    path: "/home/taskEvolve",
    component: TaskEvolve,
  }
];

export {
  menuRouter,
  userRouter
};
