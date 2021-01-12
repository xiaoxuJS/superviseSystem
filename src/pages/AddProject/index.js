import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import dayjs from "dayjs";
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
//接口
import { superviseList, superviseEmployeeList } from "../../Api/messageApi";
import { superviseAdd, superviseGet, superviseModify } from "../../Api/userApi";
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
  message,
} from "antd";

import { AddProjectBox } from "./style";
//引入组件
import UploadFile from "../../components/UploadFile";

// antd
const { Title } = Typography;
const { Option } = Select;

/**
 * 立项 添加页面和修改立项
 */

const AddProject = () => {
  const history = new useHistory();
  const location = new useLocation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [depData, setDepData] = useState([]); //单位列表
  const [addUnit, setAddUnit] = useState([
    {
      key: 0,
      dept: "dept",
      chargePerson: "chargePerson",
      telephone: "telephone",
      newArray: []
    },
  ]);
  const [several, setSeveral] = useState(1);
  const [fileArray, setFileArray] = useState([]); //上传附件id
  const [fileList, setFileList] = useState([]); //上传附件列表
  const [mainDepPerson, setMainDepPerson] = useState([]); //主要单位负责人
  const mainDepPersonFun = useCallback((id) => { //主办单位
    ; (async () => {
      const { success, data } = await superviseEmployeeList({ department: id });
      if (success) {
        setMainDepPerson(data)
      }
    })();
  }, [])
  const assistPersonFun = useCallback((id, key) => { //协办单位
    ; (async () => {
      const { success, data } = await superviseEmployeeList({ department: id });
      if (success) {
        const newArr = [];
        for (const index in addUnit) {
          let addUnitData = {};
          if(addUnit[index].key === key){
            addUnitData = addUnit[index];
            addUnitData.newArray = data;
            newArr.push(addUnitData)
          }else{
            newArr.push(addUnit[index])
          }
          
        };
        setAddUnit(newArr)
      }
    })();
  }, [addUnit])
  useEffect(() => {
    if (location.state) {
      //判断是添加是修改
      (async () => {
        const { success, data } = await superviseGet({ id: location.state.id });
        if (success) {
          mainDepPersonFun(data.organizer);
          let newArray = {};
          let newAddUnit = [];
          newArray.taskName = data.taskName; //任务名称
          newArray.taskNo = data.taskNo; //编号
          newArray.timeLimit = dayjs(data.timeLimit, "YYYY-MM-DD"); //时限
          newArray.organizer = data.organizer; //主办单位
          newArray.organizerPerson = data.organizerPerson; //主办单位负责人
          newArray.organizerMobile = data.organizerMobile; //联系方式
          if (data.depList && data.depList.length > 1) {
            for (const key in data.depList) {
              if (key > 0) {
                newAddUnit.push({
                  key: key,
                  dept: "dept" + key,
                  chargePerson: "chargePerson" + key,
                  telephone: "telephone" + key,
                  newArray:[]
                });
              } else {
                newAddUnit.push({
                  key: '0',
                  dept: "dept",
                  chargePerson: "chargePerson",
                  telephone: "telephone",
                  newArray:[]
                });
              }
            }
            for (const key in newAddUnit) {
              ; (async () => {
                const val = await superviseEmployeeList({ department: data.depList[key].dept});
                if (val.success) {
                  newAddUnit[key].newArray = val.data;
                }
              })();
            }
            setAddUnit([...newAddUnit]);
           
            setSeveral(data.depList.length);

            for (const key in newAddUnit) {
              newArray[newAddUnit[key].dept] = data.depList[key].dept; //协办单位
              newArray[newAddUnit[key].chargePerson] =
                data.depList[key].chargePerson; //协办单位负责人
              newArray[newAddUnit[key].telephone] = data.depList[key].telephone; //联系方式
            }
          } else if (data.depList && data.depList.length === 1) {
            newArray.dept = data.depList[0].dept; //协办单位
            newArray.chargePerson = data.depList[0].chargePerson; //协办单位负责人
            newArray.telephone = data.depList[0].telephone; //联系方式
          }

          newArray.publicity = data.publicity + ""; //是否公示

          if (data.attachments.length !== 0) {
            let newFileList = [];
            for (const key in data.attachments) {
              newFileList.push({
                uid: data.attachments[key].id,
                name: data.attachments[key].attachmentName
              })
            }
            setFileList(newFileList);
          }
          newArray.workContent = BraftEditor.createEditorState(data.workContent)
          setFieldsValue(newArray);
        }
      })();
    }
    (async () => {
      const { success, data } = await superviseList();
      if (success) {
        setDepData(data);
      }
    })();
  }, [location.state, setFieldsValue, mainDepPersonFun]);
  // form
  const onFinish = (values) => {
    const data = {};
    data.timeLimit = dayjs(values.timeLimit).format("YYYY-MM-DD"); // 完成时限
    data.taskName = values.taskName; //任务名称
    data.taskNo = values.taskNo; //编号
    data.organizer = values.organizer; //部门id
    data.organizerPerson = values.organizerPerson; //主办单位负责人
    data.organizerMobile = values.organizerMobile; //主办单位联系方式
    data.publicity = values.publicity; //是否公开
    values.workContent
      ? (data.workContent = values.workContent.toHTML())
      : (values.workContent = undefined); //工作内容
    fileArray.length > 0 ? (data.attachmentIds = fileArray) : setFileArray([]); //上传附件 id
    data.depList = []; //协助部门
    for (let index = 0; index < several; index++) {
      if (addUnit[index]) {
        data.depList.push({
          dept: values["dept" + (index === 0 ? "" : index)],
          chargePerson: values["chargePerson" + (index === 0 ? "" : index)],
          telephone: values["telephone" + (index === 0 ? "" : index)],
        });
      }
    }
    if (location.state) {
      data.id = location.state.id;
      (async () => {
        const { success } = await superviseModify(data);
        if (success) {
          message.success("立项修改成功！");
          history.push("/superviseManage");
        }
      })();
    } else {
      (async () => {
        const { success } = await superviseAdd(data);
        if (success) {
          message.success("立项成功！");
          history.push("/superviseManage");
        }
      })();
    }

  };
  //添加协办单位
  const handleAddUnit = () => {
    let newArray = [...addUnit];
    newArray[several] = {};
    newArray[several]["key"] = several;
    newArray[several]["dept"] = "dept" + several;
    newArray[several]["chargePerson"] = "chargePerson" + several;
    newArray[several]["telephone"] = "telephone" + several;
    newArray[several]["newArray"] = [];
    setAddUnit([...newArray]);
    setSeveral(several + 1);
  };
  // 删除协办单位
  const handleRemoveUnit = (idx) => {
    const newAddUnit = [...addUnit];
    for (const key in newAddUnit) {
      if (newAddUnit[key] && idx === newAddUnit[key].key) {
        newAddUnit.splice(key, 1);
      }
    }
    setAddUnit(newAddUnit);
  };
  //附件上传
  const onFuleUpdata = (data) => {
    let newArray = [];
    for (const key in data) {
      newArray.push(data[key].response.data.attachmentId);
    }
    setFileArray(newArray);
  };
  //获取富文本框中的内容
  const handleContentChange = (value) => {
  };
  //主办单位
  const handleMainDepPersonFun = (value) => {
    mainDepPersonFun(value)
  };
  //协办单位
  const handleChangeAssistPerson = (id, key) => {
    assistPersonFun(id, key)
  }

  const config = {
    rules: [{ type: "object", required: true, message: "Please select time!" }],
  };

  const addUnitShow = () => {
    let newArray = [];
    for (const key in addUnit) {
      if (addUnit[key]) {
        newArray.push(
          <Row key={addUnit[key].dept}>
            <Col span={12}>
              <Form.Item name={addUnit[key].dept} label="单位" hasFeedback>
                <Select placeholder="请选择协办单位" onChange = {(value) => handleChangeAssistPerson(value, addUnit[key].key)}>
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
              <Form.Item label="负责人" name={addUnit[key].chargePerson}>
                <Select placeholder="请选择协办单位负责人！">
                  {addUnit[key].newArray.length > 0
                    ? addUnit[key].newArray.map((item) => {
                      return (
                        <Option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </Option>
                      );
                    })
                    : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="电话" name={addUnit[key].telephone}>
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
                    onClick={() => handleRemoveUnit(addUnit[key].key)}
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
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
            <Form.Item
              name="organizer"
              label="主办单位"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "请选择主办单位!",
                },
              ]}
            >
              <Select placeholder="请选择主办单位" onChange={handleMainDepPersonFun}>
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
              <Select placeholder="请选择主办单位负责人！">
                {mainDepPerson
                  ? mainDepPerson.map((item) => {
                    return (
                      <Option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </Option>
                    );
                  })
                  : null}
              </Select>
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
            <Form.Item
              name="publicity"
              label="是否公示"
              rules={[
                {
                  required: true,
                  message: "请选择是否公示!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="附件">
              <UploadFile onChange={onFuleUpdata} upTitle="附件上传" value={fileList} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="内容" labelCol={{ span: 2 }} name="workContent">
              <BraftEditor
                style={{ border: "1px solid #bbbbbb" }}
                onChange={handleContentChange}
              />
              {/* <RichText /> */}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {location.state ? '修改' : '保存'}
          </Button>
        </Form.Item>
      </Form>
    </AddProjectBox>
  );
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 19, span: 5 },
};

export default AddProject;
