import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Row, Col, Card, Input } from "antd";
import { RightCircleOutlined, SearchOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";

import logo from "./../imgs/logo.png";

import axios from "axios";

import { baseUrl } from "./../index";

var arr = [...new Array(16).keys()];
function Index(props) {
  const [list, setList] = useState([]);

  const getvideosList = () => {
    axios.get(baseUrl + "indexVideos?num=4").then((params) => {
      setList(params.data.data);
    });
  };

  const his = useHistory();

  useEffect(() => {
    getvideosList();
  }, []);

  const toPage = (singerId) => {
    props.onChangeSingerId(singerId);
    getSongs()
    his.push("/now");
  };

  const getSongs = (singerId) => {
    axios.get(baseUrl + "authVideos?singerId=" + singerId).then((params) => {
      var data = params.data.data;
      props.setSongsList(data);
      props.onChangeSong(data[0]);
    });
  };

  return (
    <div className="index">
      <div className="content">
        <Row className="center">
          <Col span={10} className="left">
            <div className="left-splash">
               {/* <img src={logo} alt="logo" /> */}
               <h1>TRE<span>N</span>DY<span>M</span></h1>
              <h2>Personal music lib, explore,<br/>enjoy music life</h2>
              <div className="input-wrap">
                <Input
                  size="large"
                  style={{
                    width: "50%",
                    margin: "0 auto",
                    borderRadius: "16px",
                  }}
                  placeholder="Artist or Genre"
                  suffix={<SearchOutlined />}
                />
              </div>
              <div className="text">
                <p>Take part into us as listeners of my preference</p>
                <p className="">
                Friendly and easy to use. No more needed.
                </p>
              </div>
            </div>
          </Col>
          <Col span={14} className="right">
            <h3 className="">Trending Stations</h3>
            <Row gutter={[20, 20]}>
              {list.map((it, index) => (
                <Col span={8} key={index}>
                  <Card
                    className="cards"
                    bodyStyle={{ padding: 10 }}
                    bordered={false}
                    onClick={() => {
                      toPage(it._id);
                    }}
                  >
                    <div className="img-wraps">
                      <div className="img-wrap">
                        {it.videos.map((video, index) => (
                          <img
                            key={video.videoName}
                            alt={video.videoName}
                            src={video.videoImg}
                          />
                        ))}
                      </div>
                      <div className="play-hover">
                        <RightCircleOutlined />
                      </div>
                    </div>

                    <div className="card-inner">
                      <div>{it.singerName}</div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <div className="footer">
          <div className="footer-item">
            <a href="/aboutus" target="popout">
              About
            </a>
          </div>
          <div className="footer-item">
            <a href="/contactus" target="popout">
              Contact
            </a>
          </div>
          <div className="footer-item">
            <a href="/terms" target="popout">
              Terms &amp; Privacy
            </a>
          </div>
          <div className="footer-item">
            <a href="/faq" target="popout">
              Help
            </a>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
