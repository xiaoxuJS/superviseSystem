import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from 'react-router-dom'
import { Layout, Menu, Space, Button } from "antd";
import { HomeAll, HomeHeaderRight } from "./style.js";
import UserRoutes from "../../Route";
import { menuRouter } from '../../Route/Routes'
import logo from '../../utils/images/logo.png';
const { Header, Content, Sider } = Layout;

const Home = () => {
  const history = new useHistory();
  const contentHeight = window.innerHeight - 140;
  const [menuRouterRolesLlist, setMenuRouterRolesLlist] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [userData, setUserData] = useState(null)
  const rolFun = useCallback(() => {
    const roles = JSON.parse(sessionStorage.getItem('userInfo')).functionList;
    const menuRouterRoles = []
    for (const key in roles) {
      for (const index in menuRouter) {
        if(roles[key] === menuRouter[index].meta.title) {
          menuRouterRoles.push(menuRouter[index])
        }
      }
    }
    let add = true
    for (const key in menuRouterRoles) {
      if(menuRouterRoles[key].meta.title === '督办事项'){
        add = false;
        setSelectedKeys([menuRouter[key].key])
      }
    }
    if(add) {
      for (const key in menuRouter) {
        if(menuRouter[key].meta.title === '督办事项'){
          menuRouterRoles.push(menuRouter[key]);
          setSelectedKeys([menuRouter[key].key])
        }
      }
    }
    history.push(menuRouterRoles[0].path)
    setSelectedKeys([menuRouterRoles[0].key + ''])
    setMenuRouterRolesLlist(menuRouterRoles)
  },[])
  useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem('userInfo')));
    rolFun();
  },[rolFun])
  const handleEnterPage = (pageUrl) => {
    sessionStorage.removeItem("menu");
    history.push(pageUrl);
  };
  const onSelect = ({ keyPath }) => {
    setSelectedKeys(keyPath)
  };
  //退出登录
  const handleExit = () => {
    // 退出系统
    sessionStorage.clear()
    window.location.href = "http://10.4.56.8/";
  }
  return (
    <HomeAll>
      <Layout>
        <Header>
          <img src = {logo} alt = "logo" />
          <HomeHeaderRight>
            {
              userData ? (<Space>
                <Button type="link">{userData.depName}</Button>
                <Button type="link">{userData.name}</Button>
                <Button type="link" onClick = {handleExit}>退出登录</Button>
              </Space>) : null
            }

          </HomeHeaderRight>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            {
              selectedKeys.length === 1 ?  <Menu
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
              selectedKeys= {selectedKeys}
              onSelect= {onSelect}
              theme={'light'}
            >
              {
                menuRouterRolesLlist.map(item => {
                  return <Menu.Item icon = {item.meta.icon} key= {item.key} onClick={() => handleEnterPage(item.path)}>
                   {item.meta.title}
                  </Menu.Item>
                })
              }
            </Menu> : null
            }

          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                minHeight: contentHeight,
              }}
            >
              <UserRoutes />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </HomeAll>
  );
};
export default Home;
