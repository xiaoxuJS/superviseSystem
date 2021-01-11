import { http, baseUrl} from "./http";


export function superviseList(data) { //用户登录
  const url = baseUrl + "/supervise/list";
  return http(url, "get", data)
}
export function superviseAdd(data) { //添加立项
  const url = baseUrl + "/supervise/add";
  return http(url, "post", data)
}
export function superviseGet(data) { //立项 -- 详情
  const url = baseUrl + "/supervise/get";
  return http(url, "get", data)
}
export function superviseDetails(data) { //立项 -- 删除
  const url = baseUrl + "/supervise/deleted";
  return http(url, "delete", data)
}
export function superviseModify(data) { //立项 -- 修改
  const url = baseUrl + "/supervise/modify";
  return http(url, "put", data)
}
export function superviseAudit(data) { //立项 -- 审核
  const url = baseUrl + "/supervise/audit";
  return http(url, "post", data)
}
export function superviseDetailLIst(data) { //立项 -- 详情 -- 协作单位汇报
  const url = baseUrl + "/supervise/detail/list";
  return http(url, "get", data)
}
export function superviseDetailGet(data) { //立项 -- 详情 -- 协作单位汇报--详情
  const url = baseUrl + "/supervise/detail/get";
  return http(url, "get", data)
}
export function superviseDetailAdd(data) { //立项 -- 详情 -- 协作单位创建
  const url = baseUrl + "/supervise/detail/add";
  return http(url, "post", data)
}
export function superviseDetailModify(data) { //立项 -- 详情 -- 协作单位修改
  const url = baseUrl + "/supervise/detail/modify";
  return http(url, "post", data)
}

//{reviewer: '402880bd52b43c210152b43c8c630000'}
export function superviseLogList(data) { //督办事项申请 --待办工作
  const url = baseUrl + "/supervise/log/list";
  return http(url, "get", data)
}

export function superviseLogApplicationList(data) { //督办事项申请 --待办工作
  const url = baseUrl + "/supervise/log/application-list";
  return http(url, "get", data)
}

export function superviseLogSubmit(data) {  // 立项审核/申请办结 办理
  const url = baseUrl + "/supervise/log/submit";
  return http(url, "post", data)
}

export function superviseLogFinishList(data) {  // 立项 -- 申请办结列表
  const url = baseUrl + "/supervise/log/finish-list";
  return http(url, "get", data)
}
export function superviseStatistics(data) {  //统计
  const url = baseUrl + "/supervise/statistics";
  return http(url, "get", data)
}