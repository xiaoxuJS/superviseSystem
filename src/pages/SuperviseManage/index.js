import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Divider, Button, Table, Space, PageHeader, Modal, message } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { SuperviseManageBox } from "./style";
import SelectSupervise from "./components/SelectSupervise";
import { superviseList, superviseDetails } from "../../Api/userApi";

const { confirm } = Modal;

/**
 * 督办事项管理
 */
const SuperviseManage = () => {
  const history = new useHistory();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNum] = useState(1);
  const [pageSize] = useState(10);

  const handleList = useCallback(() => {
    (async () => {
      const { success, data } = await superviseList();
      if (success) {
        setData(data.records);
        setTotal(data.total);
      }
    })();
  },[])

  useEffect(() => {
    handleList();
  }, [handleList]);

  const status = {
    1: "申请中",
    2: "审核中",
    3: "办理中",
    4: "申请办结",
    5: "已完成",
  };
  const columns = [
    {
      title: "#",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "任务名称",
      dataIndex: "taskName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "下达时间",
      dataIndex: "releaseTime",
    },
    {
      title: "完成时限",
      dataIndex: "timeLimit",
    },
    {
      title: "督办状态",
      render: (text, record) => <span>{status[record.status]}</span>,
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEnterSuperviseApply(record.id)}>
            立项审核
          </Button>
          <Button type="primary"onClick = {() => handleChangePeiject(record.id)}>修改</Button>
          <Button type="primary" onClick = {() => handleDelete(record.id)} danger>删除</Button>
          <Button
            type="primary"
            onClick={() => handleEnterSuperviseDetails(record.id)}
          >
            详情
          </Button>
        </Space>
      ),
    },
  ];

  const pagination = {
    current: pageNum,
    pageSize,
    total,
    showTotal: () => `总条数 ${total} 条`,
    onChange: (page, pageSize) => {
      // console.log(page, pageSize);
    },
  };
  // 立项
  const handleEnterAddProject = () => {
    history.push("/addProject");
  };
  // 修改立项
  const handleChangePeiject = (id) => {
    history.push({pathname: "/addProject", state: {id}});
  };
  const handleEnterSuperviseApply = (id) => {
    sessionStorage.setItem("menu", "/superviseManage");
    history.push({pathname: "/superviseApply", state: {id}});
  };
  const handleEnterSuperviseDetails = (id) => {
    history.push({ pathname: "/superviseDetails", state: { id } });
  };
  //删除项目
  const handleDelete = (id) => {
    confirm({
      title: '确定删除吗?',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      onOk() {
        ;(async () => {
          const {success} = await superviseDetails({id});
          if(success) {
            message.success('恭喜你删除成功！');
            handleList();
          }
        })();
      }
    });
  }

  return (
    <SuperviseManageBox>
      <PageHeader ghost={false} title="督办事项" />
      <Divider />
      <SelectSupervise />
      <Divider />
      <div>
        <Button type="primary" onClick={() => handleEnterAddProject()}>
          立项
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        rowKey="key"
      />
    </SuperviseManageBox>
  );
};

export default SuperviseManage;
