import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { superviseList } from "../../Api/messageApi";
import {
  PageHeader,
  Button,
  Divider,
  Typography,
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  Space,
  Radio,
} from "antd";
import { AddProjectBox } from "./style";

import RichText from "../../components/RichText";
import UploadFile from "../../components/UploadFile";

const { Title } = Typography;
const { Option } = Select;

/**
 * 立项 添加页面
 */

const AddProject = () => {
  const history = new useHistory();
  const [depData, setDepData] = useState([]);
  const [addUnit, setAddUnit] = useState([
    {
      key: 0,
      dept: null,
      chargePerson: null,
      telephone: null,
    },
  ]);
  const [several, setSeveral] = useState(1);

  useEffect(() => {
    (async () => {
      const { success, data } = await superviseList();
      if (success) {
        setDepData(data);
      }
    })();
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleAddUnit = () => {
    addUnit[several] = {};
    addUnit[several]["key"] = several;
    addUnit[several]["dept" + several] = null;
    addUnit[several]["chargePerson" + several] = null;
    addUnit[several]["telephone" + several] = null;
    setAddUnit([...addUnit]);
    setSeveral(several + 1);
  };
  const handleRemoveUnit = (idx) => {
    const newAddUnit = [...addUnit];
    for (const key in newAddUnit) {
      if (idx === newAddUnit[key].index) {
        newAddUnit.splice(key, 1);
      }
    }
    setAddUnit(newAddUnit);
  };
  const onChange = (data) => {
    console.log(data);
  };

  const config = {
    rules: [{ type: "object", required: true, message: "Please select time!" }],
  };

  const addUnitShow = () => {
    let newArray = [];
    for (const key in addUnit) {
      newArray.push(
        <Row key={addUnit[key].dept}>
          <Col span={12}>
            <Form.Item name={addUnit[key].dept} label="单位" hasFeedback>
              <Select placeholder="请选择协办单位">
                {depData
                  ? depData.map((item) => {
                      return (
                        <Option
                          key={item.departmentId}
                          value={item.departmentId}
                        >
                          {item.departmentName}
                        </Option>
                      );
                    })
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="负责人"
              name={addUnit[key].chargePerson}
              rules={[{ required: true, message: "请输入负责人" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="电话"
              name={addUnit[key].telephone}
              rules={[{ required: true, message: "请输入电话" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item>
              {addUnit[key].key === 0 ? null : (
                <Button
                  type="primary"
                  size="small"
                  danger
                  onClick={() => handleRemoveUnit(addUnit[key].index)}
                >
                  删除
                </Button>
              )}
            </Form.Item>
          </Col>
          <Divider />
        </Row>
      );
    }
    return newArray;
  };

  return (
    <AddProjectBox>
      <PageHeader
        ghost={false}
        onBack={() => history.go("-1")}
        title="督办事项"
      />
      <Divider />
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row key="1">
          <Col span={24}>
            <Title level={5}>基本信息</Title>
          </Col>
          <Col span={12}>
            <Form.Item
              label="任务名称"
              name="taskName"
              rules={[{ required: true, message: "请输入任务名称！" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="编号"
              name="taskNo"
              rules={[{ required: true, message: "请输入编号！" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="timeLimit" label="完成时限" {...config}>
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row key="2">
          <Col span={24}>
            <Title level={5}>承办单位</Title>
          </Col>
          <Col span={12}>
            <Form.Item name="organizer" label="主办单位" hasFeedback>
              <Select placeholder="请选择主办单位">
                {depData
                  ? depData.map((item) => {
                      return (
                        <Option
                          key={item.departmentId}
                          value={item.departmentId}
                        >
                          {item.departmentName}
                        </Option>
                      );
                    })
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="主办单位负责人"
              name="organizerPerson"
              rules={[{ required: true, message: "请输入主办单位负责人" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="联系方式"
              name="organizerMobile"
              rules={[{ required: true, message: "请输入联系方式" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row key="3">
          <Col span={24}>
            <Title level={5}>
              <Space>
                协办单位
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleAddUnit()}
                >
                  添加 +{" "}
                </Button>
              </Space>
            </Title>
          </Col>
        </Row>
        {addUnitShow()}
        <Row key="4">
          <Col span={12}>
            <Form.Item name="publicity" label="是否公示">
              <Radio.Group>
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="附件">
              <UploadFile onChange={onChange} upTitle="附件上传" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="workContent" label="内容">
          <RichText />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </AddProjectBox>
  );
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 19, span: 5 },
};

export default AddProject;
