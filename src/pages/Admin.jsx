import { Col, Divider, Row } from "antd";
import React from "react";
import CreateUser from "../components/Modal/CreateUser";

const Admin = () => {
  return (
    <div>
      <Divider orientation="left">Admin actions</Divider>
    <Row justify="space-evenly">
      <Col span={4}><CreateUser/></Col>
      <Col span={4}><CreateUser/></Col>
      <Col span={4}><CreateUser/></Col>
      <Col span={4}><CreateUser/></Col>
    </Row>
    </div>
  );
};

export default Admin;
