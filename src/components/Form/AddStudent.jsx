import React from "react";
import "antd/dist/antd.css";
import { Button, Form, Input } from "antd";
import { post } from "../../Api/Based";
import { AccessToken } from "../../config/config";

const AddStudent = (props) => {
  const onFinish = (values) => {
    const Headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AccessToken)}`,
      },
    };
    post(`/addStudentToClass/${values.studentId}`, {}, Headers)
      .then(function (response) {
        if (response.request.status === 204) {
          // alert("AddStudent successful")
          props.call();
        }
      })
      .catch(function (error) {
        alert(`${error}`);
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
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
        label="StudentId"
        name="studentId"
        rules={[
          {
            required: true,
            message: "Please input studentId you want to add!",
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
  );
};

export default AddStudent;
