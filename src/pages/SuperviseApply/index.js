import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
// api
import {
  superviseGet,
  superviseAudit,
  superviseLogList,
  superviseLogSubmit,
} from "../../Api/userApi";
import { superviseLeaderList } from "../../Api/messageApi";
import {
  PageHeader,
  Divider,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Table,
  message,
  Space,
} from "antd";
import { SuperviseApplyBox } from "./style.js";
import EssentialValue from "../../components/EssentialValue";

// 枚举 审核流程
import { statusEnum, currentNodeEnum } from "../../utils/enum";

const { Option } = Select;

/**
 * 立项审核
 */

const SuperviseLead = () => {
  const history = new useHistory();
  const location = new useLocation();

  const [menu, setMenu] = useState(null);
  const [detailsData, setDetailsData] = useState({}); //详情数据
  const [leaderData, setLeaderData] = useState([]); //单位列表
  const [logList, setLogList] = useState([]); //单位列表
  const [inputText, setInputText] = useState(null); //input
  const columns = [
    {
      title: "#",
      render: (text, recode, index) => <span>{index + 1}</span>,
    },
    {
      title: "办理节点",
      dataIndex: "currentNode",
      render: (text) => <span>{currentNodeEnum[text]}</span>,
    },
    {
      title: "办理人",
      dataIndex: "reviewerName",
    },
    {
      title: "办理时间",
      dataIndex: "handleTime",
    },
    {
      title: "办理结果",
      dataIndex: "taskStatus",
      render: (text) => <span>{statusEnum[text]}</span>,
    },
  ];

  const detailsDataFun = useCallback(() => {
    (async () => {
      const { success, data } = await superviseGet({ id: location.state.id });
      if (success) {
        setDetailsData(data);
        if (menu === "/okAudit") {
          setInputText(data.logList[0].leaderOpinion);
        }
      }
    })();
  }, [location.state.id]);

  const leaderListFun = useCallback(() => {
    (async () => {
      const { success, data } = await superviseLeaderList();
      if (success) {
        setLeaderData(data);
      }
    })();
  }, []);
  const superviseLogListFun = useCallback(() => {
    (async () => {
      const { success, data } = await superviseLogList({
        taskId: location.state.id,
        handleStatus: 1,
      });
      if (success) {
        setLogList(data.records);
      }
    })();
  }, [location.state.id]);
  useEffect(() => {
    setMenu(sessionStorage.getItem("menu"));
    leaderListFun();
    detailsDataFun();
    superviseLogListFun();
    return () => {
      sessionStorage.removeItem("menu");
    };
  }, [detailsDataFun, leaderListFun, superviseLogListFun]);
  //确定审核
  const onFinish = (values) => {
    const data = {
      task: detailsData.id,
      remark: values.remark,
      reviewer: values.reviewer,
    };
    (async () => {
      const { success } = await superviseAudit(data);
      if (success) {
        if (menu === "/superviseMatter") {
          message.success("申请办结成功");
          history.push("/superviseMatter");
        } else if (menu === "/superviseManage") {
          message.success("审核成功");
          history.push("/superviseManage");
        }
      }
    })();
  };
  //院领导意见信息-领导意见
  const handleChangeTextArea = (e) => {
    setInputText(e.target.value);
  };
  //修改状态
  const handleChangeStatus = (state) => {
    if (inputText) {
      let data = {
        id: location.state.logId,
        task: location.state.id,
        status: state,
        leaderOpinion: inputText,
      };
      (async () => {
        const { success } = await superviseLogSubmit(data);
        if (success) {
          if (state === 1) {
            message.success("暂存成功！");
          } else if (state === 2) {
            message.success("通过成功！");
          } else if (state === 3) {
            message.success("驳回成功！");
          }
          history.push(menu);
        }
      })();
    } else {
      message.warning("请输入院领导意见！");
    }
  };

  return (
    <SuperviseApplyBox>
      <PageHeader
        ghost={false}
        onBack={() => history.go("-1")}
        title="立项审核"
      />
      <Divider />
      <EssentialValue detailsData={detailsData} />
      <Row>
        {menu === "/superviseManage" ? (
          <Col span={24}>
            <Form
              // {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="remark"
                label="任务来源"
                rules={[{ required: true, message: "请输入任务来源！" }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="reviewer"
                label="院领导"
                rules={[{ required: true, message: "请选择院领导" }]}
                hasFeedback
              >
                <Select placeholder="请选择院领导">
                  {leaderData
                    ? leaderData.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.userName}
                          </Option>
                        );
                      })
                    : null}
                </Select>
              </Form.Item>
              <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  确认提交
                </Button>
              </Form.Item>
            </Form>
          </Col>
        ) : null}
      </Row>
      {menu === "/projectAudit" ? (
        <Row>
          <Col span={24}>办理信息</Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={logList}
              size="small"
              bordered
            />
          </Col>

          <Col span={24}>办理意见</Col>
          <Col span={24}>
            任务来源：
            {detailsData.logList ? detailsData.logList[0].remark : null}
          </Col>

          <Col span={24}>院领导意见:</Col>
          <Col span={24}>
            <Input.TextArea onChange={handleChangeTextArea} value={inputText} />
          </Col>
          {location.state.logId ? (
            <Col span={24}>
              <Space>
                <Button
                  type="dashed"
                  onClick={() => {
                    handleChangeStatus(3);
                  }}
                >
                  驳回
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    handleChangeStatus(2);
                  }}
                >
                  通过
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    handleChangeStatus(1);
                  }}
                >
                  暂存
                </Button>
              </Space>
            </Col>
          ) : null}
        </Row>
      ) : null}
      {/* 申请办结办理 */}
      {menu === "/okAudit" ? (
        <Row>
          <Col span={24}>办理信息</Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={logList}
              size="small"
              bordered
            />
          </Col>

          <Col span={24}>办理意见</Col>
          <Col span={24}>
            办结申请：
            <Space>
              <span>{detailsData.taskName}</span>
              <span>
                {detailsData.depList
                  ? detailsData.logList[detailsData.logList.length - 1]
                      .dataCreatedTime
                  : null}
              </span>
            </Space>
          </Col>
          <Col span={24}>领导意见: {location.state.logId ? null : detailsData.logList ? `${detailsData.logList[detailsData.logList.length -2].leaderOpinion}${detailsData.logList[detailsData.logList.length -2].dataCreatedTime} `: null}</Col>

          {location.state.logId ? (
            <>
              <Col span={24}>
                <Input.TextArea
                  onChange={handleChangeTextArea}
                  value={inputText}
                />
              </Col>
              <Col span={24}>
                <Button
                  type="dashed"
                  onClick={() => {
                    handleChangeStatus(3);
                  }}
                >
                  驳回
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    handleChangeStatus(2);
                  }}
                >
                  通过
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    handleChangeStatus(1);
                  }}
                >
                  暂存
                </Button>
              </Col>
            </>) : null}
        </Row>
      ) : null}
      {menu === "/superviseMatter" ? ( //申请办结
        <Row>
          <Col span={24}>
            <Form
              // {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="reviewer"
                label="院领导"
                rules={[{ required: true, message: "请选择院领导" }]}
                hasFeedback
              >
                <Select placeholder="请选择院领导">
                  {leaderData
                    ? leaderData.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.userName}
                          </Option>
                        );
                      })
                    : null}
                </Select>
              </Form.Item>
              <Form.Item
                name="remark"
                label="办结申请"
                rules={[{ required: true, message: "请输入办结申请！" }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  确认提交
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ) : null}
    </SuperviseApplyBox>
  );
};

export default SuperviseLead;
