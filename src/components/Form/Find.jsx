import React from "react";
import "antd/dist/antd.css";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Find = (props) => {
  let navigate = useNavigate();
  const onFinish = (values) => {
    props.call();
    navigate(`/${props.name}/${values.Id}`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label= {`${props.name}Id`}
          name="Id"
          rules={[
            {
              required: true,
              message: `Please input ${props.name}Id you want to find!`,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Find;
