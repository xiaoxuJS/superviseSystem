import { http, baseUrl} from "./http";


export function superviseList(data) { //部门列表
  const url = baseUrl + "/supervise/department/list";
  return http(url, "get", data)
}
export function superviseLeaderList(data) { //院领导列表
  const url = baseUrl + "/supervise/leader/list";
  return http(url, "get", data)
}
export function superviseEmployeeList(data) { //人员查询
  const url = baseUrl + "/supervise/employee/list";
  return http(url, "get", data)
}
export function superviseUserInfo(data) { //个人信息
  const url = baseUrl + "/supervise/user-info";
  return http(url, "get", data)
}

