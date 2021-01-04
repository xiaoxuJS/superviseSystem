import Axios from "axios";

let baseUrl = "";
let ip = "";
if (process.env.NODE_ENV === "development") { //开发环境
    ip = "10.4.55.198:8082"; //服务器
    baseUrl = "http://" + ip;
} else if (process.env.NODE_ENV === "production") {
    ip = "118.190.90.217/new";
    baseUrl = "http://" + ip;
}
//对Axios进行封装，返回Promise对象
// 添加请求拦截器
// Axios.interceptors.request.use(
//     function (config) {
//         let token = sessionStorage.getItem('token');
//         // 在发送请求之前判断是否登录，登录了配置请求头
//         if (token !== null) {
//             config.headers["Authorization"] = token;
//         }
//         return config;
//     },
//     function (error) {
//         // 对请求错误做些什么
//         return Promise.reject(error);
//     }
// );
const http = (url, method, args = {}) => {
    const xhrArgsName = (method === "get" || method === 'delete') ? "params" : "data"; //根据请求方式，判断携带的参数类型
    return new Promise((resolve, reject) => {
        Axios({
            url,
            method,
            headers: {
                "Content-Type": "application/json"
            },
            [xhrArgsName]: args,
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.dir(error);
                reject(error);
            });
    });
};

export  {
    http,
    baseUrl,
    ip
};
