import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { superviseDetailGet, superviseDetailAdd } from "../../Api/userApi";
import { PageHeader, Divider, Form, Input, Button } from "antd";
import { ReportEvolveBox } from "./style";
import UploadFile from "../../components/UploadFile";

const ReportEvolve = () => {
  const history = new useHistory();
  const location = new useLocation();
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [val, setVal] = useState({});
  const [fileArray, setFileArray] = useState([]); //上传附件id
  const [fileList, setFileList] = useState([]); //上传附件列表
  useEffect(() => {
    if(location.state) {
      (async () => {
        const { success, data } = await superviseDetailGet({
          id: location.state.id,
        });
        if (success) {
          setVal(data)
          const newObj = {};
          newObj.progressContent = data.progressContent;
          if(data.attachments) {
            let newFileList = [];
            for (const key in data.attachments) {
              newFileList.push({
                uid: data.attachments[key].id,
                name: data.attachments[key].attachmentName
              })
            }
            setFileList(newFileList);
          }
          setFieldsValue(newObj);
        }
      })();
    }
    
  }, [location.state, setFieldsValue]);
  const onFinish = (values) => {
    console.log(values)
    console.log(fileArray)
    values.attachmentIds = fileArray;
    ;(async () => {
      const {success} = await superviseDetailAdd(values);
      if(success) {

      }
    })();
  };

    //附件上传
    const onFuleUpdata = (data) => {
      let newArray = [];
      for (const key in data) {
        newArray.push(data[key].response.data.attachmentId);
      }
      setFileArray(newArray);
    };
  return (
    <ReportEvolveBox>
      <PageHeader
        ghost={false}
        onBack={() => history.go("-1")}
        title="任务进展"
      />
      <Divider />
      <Form
        {...layout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name= 'progressContent' label="任务来源">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="上传">
          <UploadFile onChange={onFuleUpdata} upTitle="附件上传" value = {fileList} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            确认提交
          </Button>
        </Form.Item>
      </Form>
    </ReportEvolveBox>
  );
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 19, span: 2 },
};

export default ReportEvolve;
