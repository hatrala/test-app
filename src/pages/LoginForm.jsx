import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

import { post } from "../Api/Based";
import { AccessToken } from "../config/config";

const LoginForm = (props) => {
  let navigate = useNavigate();
  // const dispatch = useDispatch();

  // const [loginStatus, setLoginStatus] = useState(false);

  const onFinish = (values) => {
    const loginInfo = { email: values.email, password: values.password };
    //  const res = await Axios.post(`${ApiUrl}/user/login`, loginInfo)
    const Headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AccessToken)}`,
      },
    };
    post("/user/login", loginInfo, Headers)
      .then((res) => {
        if (res.request.status === 200) {
          localStorage.setItem("AccessToken", res.data.token);
          alert("Đăng nhập thành công");
          navigate("/");
          // setLoginStatus(true);
          // dispatch({ type: "LOGIN" });
        }
      })
      .catch((error) => {
        alert(`${error.response.data.error.message}`);
      });

    // window.location.reload(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ float: "left" }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
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
    </div>
  );
};

export default LoginForm;
