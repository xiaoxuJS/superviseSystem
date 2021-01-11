import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  superviseDetailGet
} from '../../Api/userApi';
import { PageHeader, Divider, Row, Col, Space } from "antd";
import { TaskEvolveBox } from "./style";

const TaskEvolve = () => {
  const history = new useHistory();
  const location = new useLocation();
  const [val, setVal] = useState({});
  useEffect(() => {
    ;(async () => {
      const {success, data} = await superviseDetailGet({id: location.state.id});
      if(success) {
        setVal(data)
      }
    })();
  }, [location.state.id]);
  return (
    <TaskEvolveBox>
      <PageHeader
        ghost={false}
        title="任务进展"
        onBack={() => history.go("-1")}
      />
      <Divider />
      <Row>
        <Col span={4}>工作内容：</Col>
        <Col span={20}>{val.progressContent}</Col>
        <Col span={12}>
          附件：
          <Space>
            {val.attachments &&
              val.attachments.map((item) => {
                return <span> {item.attachmentName}</span>;
              })}
          </Space>
        </Col>
        <Col span={12}>汇报时间：{val.dataCreatedTime}</Col>
      </Row>
    </TaskEvolveBox>
  );
};

export default TaskEvolve;
