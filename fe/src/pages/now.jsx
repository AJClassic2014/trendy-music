import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import { Row, Col, Card, Input } from "antd";
import {
  RightCircleOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

import axios from "axios";
import { baseUrl } from "./../index";

function Now(props) {
  const [auth, setauth] = useState({
    videos: [],
  });

  const toPage = (singerId) => {};

  const getSongs = (singerId) => {
    axios.get(baseUrl + "authVideos?singerId=" + singerId).then((params) => {
      var data = params.data.data;
      props.setSongsList(data);
      props.onChangeSong(data[0]);

      props.onChangePlayVisible(true);
    });
  };

  const getDatas = () => {
    getSongs(props.singerId);

    axios
      .get(baseUrl + "singer?singerId=" + props.singerId)
      .then((response) => {
        var data = response.data.data;
        setauth(data);
      });
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div className="now">
      <div className="center-wrap">
        <div className="center">
          <Row gutter={20}>
            <Col span={7}>
              <div className="peoser">
                <img src={auth.singerImg} alt="auth" />
                <p>{auth.singerName}</p>
                <a className="button">Currently Playing</a>
              </div>
            </Col>
            <Col span={17} className="center-right">
              <h3>Top Stations</h3>
              <p>All prominently featuring songs by {auth.singerName}</p>
              <div className="t-video">
                <Row gutter={[20, 20]}>
                  {auth.videos.map((it, index) => (
                    <Col span={6}>
                      <Card
                        className="cards"
                        bodyStyle={{ padding: 10 }}
                        bordered={false}
                        onClick={() => {}}
                      >
                        <div className="img-wraps">
                          <div className="img-wrap">
                            <img alt={it.videoImg} src={it.videoImg} />
                          </div>
                          <div className="play-hover">
                            <RightCircleOutlined />
                          </div>
                        </div>

                        <div className="card-inner">
                          <div>{it.videoName}</div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeSingerId(val) {
      dispatch({
        type: "onChangeSingerId",
        val,
      });
    },
    onChangePlayVisible(val) {
      dispatch({
        type: "onChangePlayVisible",
        val,
      });
    },
    setSongsList(val) {
      dispatch({
        type: "setSongsList",
        val,
      });
    },
    onChangeSong(val) {
      dispatch({
        type: "onChangeSong",
        val,
      });
    },
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Now);
