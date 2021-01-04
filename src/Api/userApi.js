import { http, baseUrl} from "./http";


export function superviseList(data) { //用户登录
  const url = baseUrl + "/supervise/list";
  return http(url, "get", data)
}