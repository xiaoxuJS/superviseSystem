import React from 'react';
import { Avatar, Popconfirm, Space } from 'antd';
import ZhProIcon from '@/components/ZhProIcon/ZhProIcon';
import './style.less'
function SystemHeader() {
    const { userName } = JSON.parse(sessionStorage.getItem("userInfo"));
    function confirm() {
        // 退出系统
        sessionStorage.clear()
        window.location.href = "http://10.4.56.8/";
    }
    return (
        <div style={{ height: "100%", width: "100%", backgroundColor: "#0866c6", textAlign: "center" }}>
            <h1 style={{ color: "#fff", fontSize: "24px", fontWeight: "500", display: "inline-block" }}>
                黄河水利科学研究院岗位绩效考核暨目标任务考核系统
            </h1>
            <Popconfirm
                placement="bottomRight"
                title="退出系统"
                onConfirm={confirm}
            >
                <div className="zh-header-user">
                    <Space>
                        <Avatar icon={<ZhProIcon type="UserOutlined" />} style={{ verticalAlign: "text-bottom" }} />
                        <p>{userName}</p>
                        <p> <ZhProIcon type="CaretDownOutlined" fontSize="14px" /></p>
                    </Space>
                </div>
            </Popconfirm>
        </div>
    )
}

export default SystemHeader
