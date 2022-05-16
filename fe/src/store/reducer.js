const defaultState = {
  regVisible: false,
  loginVisible: false,

  showPlayVisible: false,

  isPlay: false,

  singerId: localStorage.getItem("singerId"),

  song: {},

  songs: [],
};

const redx = (state = defaultState, action) => {
  switch (action.type) {
    case "changeReg":
      return {
        ...state,
        regVisible: action.val,
      };

    case "changeLogin":
      return {
        ...state,
        loginVisible: action.val,
      };

    case "onPauseOrPlay":
      return {
        ...state,
        isPlay: action.val,
      };

    case "onChangeSong":
      return {
        ...state,
        song: action.val,
      };

    case "setSongsList":
      return {
        ...state,
        songs: action.val,
      };

    case "onChangeSingerId":
      localStorage.setItem("singerId", action.val);
      return {
        ...state,
        singerId: action.val,
      };

    case "onChangePlayVisible":
      return {
        ...state,
        showPlayVisible: action.val,
      };

    default:
      return state;
  }
};

export default redx;
