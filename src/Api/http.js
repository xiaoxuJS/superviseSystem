import Axios from "axios";

let baseUrl = "";
let ip = "";
if (process.env.NODE_ENV === "development") { //开发环境
    ip = "10.4.55.198:8082"; //服务器
    baseUrl = "http://" + ip;
} else if (process.env.NODE_ENV === "production") {
    ip = "db.zzhyrj.com/duban";
    baseUrl = "https://" + ip;
}
//对Axios进行封装，返回Promise对象
Axios.interceptors.request.use(
    function (config) {
        // 添加请求拦截器
        // 在发送请求之前判断是否登录，登录了配置请求头
        if (JSON.parse(sessionStorage.getItem("userInfo"))) {
            const { id } = JSON.parse(sessionStorage.getItem("userInfo"));
            config.headers["authorization"] = id;
        }
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);
const http = (url, method, args = {}) => {
    const xhrArgsName = (method === "get" || method === 'delete') ? "params" : "data"; //根据请求方式，判断携带的参数类型
    return new Promise((resolve, reject) => {
        Axios({
            url,
            method,
            [xhrArgsName]: args,
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
};

export {
    http,
    baseUrl,
    ip
};
