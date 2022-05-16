import React, { Component } from "react";
import { connect } from "react-redux";

import { Link, NavLink } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";

import { Dropdown, Menu } from "antd";

import logo from "./../imgs/logo.png";
import Reg from "./../components/Reg";
import Login from "./../components/Login";

class Header extends Component {
  render() {
    const menu = (
      <Menu theme="dark">
        <Menu.Item key="key1" onClick={() => this.props.changeReg(true)}>
          Sign Up
        </Menu.Item>
        <Menu.Item key="key2" onClick={() => this.props.changeLogin(true)}>
          Log In
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <div className="menu">
          <div className="center">
            <div className="logo">
              <Link to="/">
               {/*  <img src={logo} width="100" height="40" alt="" /> */}
               TRENDY<span>M</span>
              </Link>
            </div>
            <div className="nav">
              <NavLink exact activeClassName="active" to="/">
                Explore Stations
              </NavLink>
              <NavLink exact activeClassName="active" to="/now">
                Now Playing
              </NavLink>
              <NavLink exact activeClassName="active" to="/userinfo">
                My Stations
              </NavLink>
            </div>
            <div className="user">
              <Dropdown overlay={menu} placement="topCenter">
                <TeamOutlined />
              </Dropdown>
            </div>
          </div>
        </div>

        <Reg />
        <Login />
      </>
    );
  }
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
    changeLogin(val) {
      dispatch({
        type: "changeLogin",
        val,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
