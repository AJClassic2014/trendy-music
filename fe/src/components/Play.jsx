import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Row, Col, message, Button, Slider, Image } from "antd";
import {
  StepBackwardFilled,
  StepForwardFilled,
  PlayCircleOutlined,
  PauseOutlined,
  SoundOutlined,
} from "@ant-design/icons";

class Player extends Component {
  constructor() {
    super();
    this.audio = createRef();
    this.state = {
      volume: 0.5,
      showVolume: false,
      duration: 0,
      currentTime: 0,
    };
  }

  componentDidMount() {
    let audio = this.audio.current;
    const { onPauseOrPlay } = this.props;
    console.log("this.props -> :", this.props);

    // 结束-自动播放下一首
    audio.onended = () => {
      this.onStepSong();
    };
    // 暂停
    audio.onpause = () => {
      onPauseOrPlay(false);
    };
    // 播放
    audio.onplay = () => {
      this.setState({
        duration: audio.duration,
      });
      onPauseOrPlay(true);
    };
    // timeupdate Event
    audio.ontimeupdate = () => {
      this.setState({
        currentTime: audio.currentTime,
      });
    };
  }

  onStepSong = (currentSongId, next = true) => {
    // * 赋值则递归调用，否则进行初始化操作
    if (!currentSongId) {
      currentSongId = this.props.songs.findIndex(
        (item) => item._id === this.props.song._id
      );
    }
    const step = next ? 1 : -1;
    const nextSong = this.props.songs[currentSongId + step];
    // 超出数组边界
    if (!nextSong) return message.info("没歌放了喔(⊙_⊙)");

    this.props.onChangeSong(nextSong);
  };

  // 暂停
  onPause = () => {
    this.audio.current.pause();
  };

  // 播放
  onPlay = () => {
    this.audio.current.play();
  };

  // 音量
  onChangeVolume = (val) => {
    const audio = this.audio.current;
    if (audio) {
      audio.volume = val;
      this.setState({ volume: val });
    }
  };

  onChangeTime = (val) => {
    const audio = this.audio.current;
    if (audio) {
      audio.currentTime = val;
      this.setState({ currentTime: val });
    }
  };

  //   getImageUrl = (name) => {
  //     return new URL(`./../mp3/${name}`, import.meta.url).href;
  //   };

  render() {
    const { song, songs, showStatus, isPlay, onChangeShowStatus } = this.props;

    const currentSong = songs.find((item) => item._id === song._id);
    const { currentTime, duration, volume, showVolume } = this.state;
    return (
      <div className="player-warp">
        <Row
          justify="start"
          className="center"
          align="middle"
          style={{ height: "100%" }}
        >
          <audio
            ref={this.audio}
            // src={this.getImageUrl(song.url)}
            src={require(`./../mp3/${song.videoUrl}`).default}
            autoPlay
          ></audio>
          <Col span={3} offset={1}>
            <div className="player-btn-group">
              <StepBackwardFilled
                onClick={() => this.onStepSong(undefined, false)}
              />
              {isPlay ? (
                <PauseOutlined className="play" onClick={this.onPause} />
              ) : (
                <PlayCircleOutlined className="play" onClick={this.onPlay} />
              )}
              <StepForwardFilled onClick={() => this.onStepSong()} />
            </div>
          </Col>
          <Col span={15}>
            <Row align="middle">
              <Col span={3}>
                <Image
                  src={currentSong ? currentSong.videoImg : ""}
                  className="image"
                  preview={false}
                ></Image>
              </Col>
              <Col span={20}>
                <span>{currentSong ? currentSong.videoName : ""}</span>
                <Slider
                  min={0}
                  max={duration}
                  value={currentTime}
                  step={0.01}
                  style={{ margin: 0 }}
                  tooltipVisible={false}
                  onChange={(val) => this.onChangeTime(val)}
                ></Slider>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              onClick={() =>
                this.setState({ showVolume: !this.state.showVolume })
              }
              shape="circle-outline"
              icon={<SoundOutlined />}
              type="text"
            ></Button>
          </Col>

          <Col span={2}>
            {/* 音量 */}
            <Slider
              style={{ display: showVolume ? "block" : "none" }}
              onChange={(val) => this.onChangeVolume(val)}
              value={volume}
              min={0}
              max={1}
              step={0.1}
              tooltipVisible={false}
            ></Slider>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPauseOrPlay(val) {
      dispatch({
        type: "onPauseOrPlay",
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);