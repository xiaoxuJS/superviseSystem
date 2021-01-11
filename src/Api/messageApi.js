import { http, baseUrl} from "./http";


export function superviseList(data) { //部门列表
  const url = baseUrl + "/supervise/department/list";
  return http(url, "get", data)
}
export function superviseLeaderList(data) { //院领导列表
  const url = baseUrl + "/supervise/leader/list";
  return http(url, "get", data)
}

