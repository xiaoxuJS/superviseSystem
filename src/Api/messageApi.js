import { http, baseUrl} from "./http";


export function superviseList(data) { //部门列表
  const url = baseUrl + "/supervise/department/list";
  return http(url, "get", data)
}

