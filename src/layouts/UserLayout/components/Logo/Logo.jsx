import React, { memo } from 'react'
import logo from '@/assets/images/logo.png'
function Logo() {
    return (
        <div
            style={{
                height: 65,
                paddingTop: 10,
                textAlign: "center",
                borderBottom: '1px solid #f0f2f5',
                borderRight: '1px solid #f0f2f5',
            }}
        >
            <img
                src={logo}
                alt="黄河水利科学研究院绩效考核暨目标考核系统"
                style={{ height: 48 }}
            />
        </div>
    )
}

export default memo(Logo) 
