import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Modal, Select, InputNumber } from "antd";
import { post } from "../../Api/Based";
import { AccessToken } from "../../config/config";

const { Option } = Select;
const UserCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new User"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        size="middle"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="UserName"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your UserName!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: 99,
              message: "Please input your age!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Please input your gender!",
            },
          ]}
        >
          <Select placeholder="Select Gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="unknown">Unknow</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please input your type!",
            },
          ]}
        >
          <Select placeholder="Select Type">
            <Option value="student">Student</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CreateUser = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    const signUpInfo = {
      email: values.email,
      username: values.username,
      password: values.password,
      name: values.name,
      age: values.age,
      gender: values.gender,
      type: values.type,
    };
    const Headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AccessToken)}`,
      },
    };
    post(`/user/create-with-conditions`, signUpInfo, Headers)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        alert(error);
      });
    setVisible(false);
  };

  return (
    <div
      style={{
        padding: "2px 5px 7px 10px",
        marginTop: "10px",
        marginBottom: "10px",
        marginRight: "15px",
        marginLeft: "8px",
      }}
    >
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New User
      </Button>
      <UserCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CreateUser;
