import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  PageHeader,
  Divider,
  Form,
  Input,
  Button
} from 'antd';
import UploadFile from '../../components/UploadFile';

const ReportEvolve = () => {
  const history = new useHistory();
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
        <PageHeader
        ghost={false}
        onBack={() => history.go("-1")}
        title="任务进展"
      />
      <Divider />
      <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name={['user', 'introduction']} label="任务来源">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="select" label="上传附件" hasFeedback>
              <UploadFile />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                确认提交
              </Button>
            </Form.Item>
          </Form>
    </div>
  )
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 19, span: 2 },
};

export default ReportEvolve;