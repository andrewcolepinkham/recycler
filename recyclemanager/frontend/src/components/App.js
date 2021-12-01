import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./accounts/Login"; 
import Register from "./accounts/Register"; 
import PrivateRoute from "./common/PrivateRoute"; 
import { Provider } from "react-redux";
import store from "../store";
import Header from "./layout/Header";
import Dashboard from "./submissions/Dashboard";
import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from 'react-alert-template-basic';
import {loadUser } from '../actions/auth'; 


const alertOptions = {
  timeout:3000,
  position: 'top center'
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser()); 
  }
  render() {
    return (
     
      <Provider store={store}>
        <AlertProvider template={AlertTemplate}
          {...alertOptions}>
          {/* Hello bro */}
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>

                  <PrivateRoute exact path="/" components={Dashboard} />
                  <Route exact path="/" components={Login} />
                  <Route exact path="/" components={Register} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));