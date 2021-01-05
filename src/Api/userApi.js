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