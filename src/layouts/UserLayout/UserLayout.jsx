import React, { useState, useEffect } from 'react'
import { Layout, Tabs, Tooltip } from 'antd';
import Logo from './components/Logo/Logo';
import SystemMenu from './components/SystemMenu/SystemMenu';
import UserRoutes from './components/UserRoutes/UserRoutes';
import SystemHeader from './components/SystemHeader/SystemHeader';
import ZhProIcon from '../../components/ZhProIcon/ZhProIcon';
import debounce from 'lodash/debounce';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import remove from 'lodash/remove';
import './style.less';
import { Redirect } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
sessionStorage.setItem("globalHeight", (window.innerHeight - 135))
function UserLayout({ location, history }) {
    const userInfo = sessionStorage.getItem("userInfo")
    const [contentHeight, setContentHeight] = useState(window.innerHeight - 135)//页面内容区域可用高度
    const [activeTab, setActiveTab] = useState("home");//当前选中的面板
    const [panes, setPanes] = useState([
        {
            title: <span style={{ marginLeft: '10px' }}> 
                <ZhProIcon type="HomeOutlined" />
            </span>,
            key: 'home',
            closable: false
        }
    ]) // 页面选项卡，快速导航进入

    useEffect(() => {
        /**监听页面尺寸改变，获取页面可用高度 */
        window.addEventListener("resize", debounce(function (event) {
            const { target } = event;
            const { innerHeight } = target;
            setContentHeight(innerHeight - 135)
            sessionStorage.setItem("globalHeight", (innerHeight - 135))
        }, 500))
        /** 处理系统内部的页面选项卡事件*/
        const { state, pathname } = location;
        if (state) {
            const { title, key, departmentId } = state;
            if(typeof departmentId === 'undefined') {
                delete state.departmentId;
            }
            let newPanes = [...panes];
            if (findIndex(newPanes, function (o) { return o.key === key }) < 0) {
                newPanes.push({
                    title,
                    key,
                    closable: true,
                    pathname,
                    state
                })
                setPanes(newPanes);
            }
            setActiveTab(key);
        }
        /**移除事件监听 */
        return () => {
            window.removeEventListener("resize", function (event) { })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])
    /**选项卡切换 */
    function handleChangeTab(key) {
        setActiveTab(key);
        let pane = find(panes, function (o) { return o.key === key });
        history.push({
            pathname: pane.pathname,
            state: pane.state
        });
    }
    /**删除选项卡 */
    function handleEditTab(targetKey) {
        let newPanes = [...panes];
        const { state } = location;
        const { key } = state;
        if (key === targetKey) {//删除的标签是当前页面。
            let pageIndex = findIndex(newPanes, function (o) { return o.key === targetKey });
            if (newPanes[pageIndex + 1] && newPanes[pageIndex + 1].pathname) {//如果存在向后的页面，则跳转到后面一页
                history.push({
                    pathname: newPanes[pageIndex + 1].pathname,
                    state: newPanes[pageIndex + 1].state
                })
            } else if (newPanes[pageIndex - 1] && newPanes[pageIndex - 1].pathname) {//如果没有则到前一页
                history.push({
                    pathname: newPanes[pageIndex - 1].pathname,
                    state: newPanes[pageIndex - 1].state
                })
            } else {//两者都没有
                history.push("/system")
            }
        }
        remove(newPanes, function (o) { return o.key === targetKey });
        setPanes(newPanes);
    }
    if (userInfo === null) {
        return <Redirect to="/" />
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <Logo />
                <SystemMenu />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <SystemHeader />
                </Header>
                <div className="zh-tab">
                    <Tabs
                        type="editable-card"
                        size="small"
                        onChange={handleChangeTab}
                        onEdit={handleEditTab}
                        defaultActiveKey="home"
                        activeKey={activeTab}
                        hideAdd={true}
                        tabBarGutter={1}
                    >
                        {
                            panes.map(pane => {
                                if (pane.key === "home") {
                                    return (
                                        <TabPane
                                            tab={pane.title}
                                            key={pane.key}
                                            closable={pane.closable}
                                        />
                                    )
                                } else {
                                    return (
                                        <TabPane
                                            tab={
                                                <Tooltip title={pane.title}>
                                                    <span>{pane.title && pane.title.substring(0, 3)}</span>
                                                </Tooltip>
                                            }
                                            key={pane.key}
                                            closable={pane.closable}
                                        />
                                    )
                                }
                            })
                        }
                    </Tabs>
                </div>
                <Content className="site-layout-background" style={{ margin: '16px 16px', padding: 16, height: contentHeight, minHeight: contentHeight, overflowY: "auto" }}>
                    <UserRoutes />
                </Content>
            </Layout>
        </Layout>
    )
}

export default UserLayout
