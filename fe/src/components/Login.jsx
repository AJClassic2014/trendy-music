import React from "react";
import { connect } from "react-redux";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";

import { baseUrl } from "./../index";

var arr = [];
for (var i = 1921; i < 2023; i++) {
  arr.push(i);
}

function Reg(props) {
  const onFinish = (data) => {
    axios.post(baseUrl + "users/login", data).then((params) => {
      if (params.data.code === 200) {
        message.success(params.data.msg);
        props.changeLogin(false);

        localStorage.setItem("user", JSON.stringify(params.data.data));
      } else {
        message.error(params.data.msg);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      visible={props.loginVisible}
      title="Log In"
      destroyOnClose
      className="form-modal"
      footer={null}
      onCancel={() => {
        props.changeLogin(false);
      }}
      width="15%"
    >
      <Form
        preserve={false}
        className="login-form-wrap form-wrap"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "please input your email" }]}
        >
          <Input placeholder="Email * " bordered={false} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "please input your password" }]}
        >
          <Input placeholder="Password * " bordered={false} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16, span: 6 }}>
          <Button type="primary" htmlType="submit">
            LOG IN
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    changeLogin(val) {
      dispatch({
        type: "changeLogin",
        val,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reg);
