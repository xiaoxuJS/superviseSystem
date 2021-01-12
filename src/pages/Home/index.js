import React from "react";
import { useHistory } from 'react-router-dom'
import { Layout, Menu } from "antd";
import { HomeAll } from "./style.js";
import UserRoutes from "../../Route";
import { menuRouter } from '../../Route/Routes'

const { Header, Content, Sider } = Layout;

const Home = () => {
  const history = new useHistory();
  const contentHeight = window.innerHeight - 140;
  const handleEnterPage = (pageUrl) => {
    sessionStorage.removeItem("menu");
    history.push(pageUrl);
  };
  return (
    <HomeAll>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              {
                menuRouter? menuRouter.map(item => {
                  return <Menu.Item icon = {item.meta.icon} key= {item.key} onClick={() => handleEnterPage(item.path)}>
                   {item.meta.title}
                  </Menu.Item>
                }) : null
              }
            </Menu>
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
