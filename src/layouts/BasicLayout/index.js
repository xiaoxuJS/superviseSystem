import React, { useEffect } from 'react';
import Axios from 'axios';
import casUrl from '../../Api/casUrl';
import systemUrl from '../../Api/systemUrl';
import { superviseUserInfo } from '../../Api/messageApi';
import {
    BasicLayoutBox
} from './style'

function BasicLayout({history}) {
    useEffect(() => {
        /**获取url中search参数ticket */
        const { location } = window;
        const { search } = location;
        function findParam(queryStr, name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = queryStr.substr(1).match(reg);
            if (r !== null) return unescape(r[2]);
            return null;
        }
        const ticket = findParam(search, "ticket");
        if (!ticket) {
            /**如果票据不存在,重定向到CAS登录页面 */
            window.location.href = `${casUrl}login?service=${encodeURIComponent(`${systemUrl}#/login`)}`;
        } else if (ticket && ticket !== sessionStorage.getItem("ticket")) {
            /**票据存在，根据票据去CAS获取用户id */
            sessionStorage.setItem("ticket", ticket);
            const url = `${casUrl}serviceValidate?ticket=${ticket}&service=${encodeURIComponent(`${systemUrl}#/login`)}`;
            Axios.get(url).then((res) => {
                let xml = new DOMParser().parseFromString(res.data, 'text/xml');
                if (xml.getElementsByTagName("cas:serviceResponse")[0].getElementsByTagName("cas:authenticationSuccess")) {
                    const userId = xml
                        .getElementsByTagName("cas:serviceResponse")[0]
                        .getElementsByTagName("cas:authenticationSuccess")[0]
                        .getElementsByTagName("cas:attributes")[0]
                        .getElementsByTagName("cas:id")[0].textContent;
                    /**获取用户Id成功之后，再次获取用户详细信息 */
                    (async function () {
                        const {success, data} = await superviseUserInfo({ id: userId });
                        if(success) {
                            sessionStorage.setItem("userInfo", JSON.stringify(data));
                            history.push("/home");
                        }
                    })()
                }
            })
        }
    }, [history]);
    return (
        <BasicLayoutBox>
            <h1>黄河水利科学研究院绩效考核暨目标考核系统</h1>
            <h2>欢迎您 <span style={{ fontSize: 16 }}>正在登录...</span></h2>
        </BasicLayoutBox>
    )
}

export default BasicLayout
