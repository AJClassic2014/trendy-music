import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Modal, Form, Input, Button, message } from "antd";

import { baseUrl } from "./../index";

var arr = [];
for (var i = 1921; i < 2023; i++) {
  arr.push(i);
}

function Reg(props) {
  const onFinish = (data) => {
    axios.post(baseUrl + "api/users/reg", data).then((params) => {
      if (params.data.code === 200) {
        message.success(params.data.msg);
        props.changeReg(false);
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
      visible={props.regVisible}
      title="Sign Up"
      destroyOnClose
      className="form-modal"
      footer={null}
      onCancel={() => {
        props.changeReg(false);
      }}
    >
      <Form
        preserve={false}
        className="form-wrap"
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
        <br />
        <br />

        {/* <Form.Item name="year">
          <Select placeholder="Year" bordered={false}>
            {arr.map((it, index) => (
              <Select.Option key={index} value={it}>
                {it}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> */}
        {/* <Form.Item name="sex">
          <Select bordered={false} placeholder="sex">
            <Select.Option value="woman">woman</Select.Option>
            <Select.Option value="man">man</Select.Option>
            <Select.Option value="nonbinary">Nonbinary</Select.Option>
            <Select.Option value="prefer not to say">
              Prefer not to say
            </Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
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
    changeReg(val) {
      dispatch({
        type: "changeReg",
        val,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reg);
