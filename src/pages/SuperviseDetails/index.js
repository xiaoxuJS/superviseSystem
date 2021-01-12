import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
//api
import { superviseGet, superviseDetailLIst } from "../../Api/userApi";
//antd
import { PageHeader, Divider, Button, Tabs, Table, Space } from "antd";
import { SuperviseDetailsBox } from "./style.js";

import EssentialValue from "../../components/EssentialValue";
const { TabPane } = Tabs;

const SuperviseDetails = () => {
  const history = new useHistory();
  const location = new useLocation();
  const [menu, setMenu] = useState(null);
  const [detailsData, setDetailsData] = useState({});
  const [detailListData, setDetailListData] = useState([]);

  const detailList = useCallback((id) => {
    (async () => {
      const { success, data } = await superviseDetailLIst({ taskId: id });
      if (success) {
        setDetailListData(data.records);
      }
    })();
  }, []);
  useEffect(() => {
    setMenu(sessionStorage.getItem("menu"));
    const dataValue = {
      id: location.state.id,
    };
    detailList(location.state.id);
    (async () => {
      const { success, data } = await superviseGet(dataValue);
      if (success) {
        setDetailsData(data);
      }
    })();
  }, [location.state.id, detailList]);

  const callback = (key) => {
    console.log(key);
  };
  const columns = [
    {
      title: "#",
      render: (text, recode, index) => <span>{index + 1}</span>,
    },
    {
      title: "进展内容",
      dataIndex: "progressContent",
    },
    {
      title: "汇报时间",
      dataIndex: "dataCreatedTime",
    },

    {
      title: "操作",
      render: (text, record) => (
        <Space size="middle">
          {menu && menu === "/superviseMatter" ? (
            <>
              <Button
                type="primary"
                onClick={() => history.push({pathname: "/reportEvolve", state: {id: record.id}})}
              >
                修改
              </Button>
              <Button type="primary" danger>删除</Button>
            </>
          ) : null}

          <Button
            type="primary"
            onClick={() =>
              history.push({
                pathname: "/taskEvolve",
                state: { id: record.id },
              })
            }
          >
            详情
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <SuperviseDetailsBox>
      <PageHeader
        ghost={false}
        onBack={() => history.go("-1")}
        title="督办事项"
      />
      <Divider />
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="督办事项" key="1">
          <EssentialValue detailsData={detailsData} />
        </TabPane>
        <TabPane tab="任务进展" key="2">
          {menu && menu === "/superviseMatter" ? (
            <Button
              type="primary"
              onClick={() => history.push("/reportEvolve")}
            >
              汇报进展
            </Button>
          ) : null}
          <Table columns={columns} dataSource={detailListData} rowKey="id" />
        </TabPane>
      </Tabs>
    </SuperviseDetailsBox>
  );
};

export default SuperviseDetails;
