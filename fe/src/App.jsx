import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

import Index from "./pages/index";
import MyHeader from "./pages/header";
import Now from "./pages/now";
import Play from "./components/Play";

function App(props) {
  return (
    <Router>
      <MyHeader></MyHeader>

      <Switch>
        <Route path="/" exact>
          <Index></Index>
        </Route>
        <Route path="/now" exact>
          <Now></Now>
        </Route>
      </Switch>

      {props.showPlayVisible && <Play />}
    </Router>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onChangePlayVisible(val) {
      dispatch({
        type: "onChangePlayVisible",
        val,
      });
    },
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
