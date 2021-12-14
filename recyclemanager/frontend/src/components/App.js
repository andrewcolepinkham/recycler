import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, HashRouter } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';
import SubmissionForm from './submissions/SubmissionForm';
import Profile from './submissions/Profile';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Account from './accounts/Account'; 
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import EditProfile from './submissions/EditProfile';
import About from './layout/About';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';




const alertOptions = {
  timeout: 6000,
  position: 'top center'
}

class App extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
         <HashRouter>
          <Fragment>
          <Header />
          <Alerts />
          <div className="container">
            <Switch>
            <Route
              exact
              path="/"
              render={() => {
                  console.log(this.props.isAuthenticated)
                  if(this.props.isAuthenticated){
                    return <Redirect to="/profile" />
                  }
                  else{
                    return <Redirect to="/login" /> 
                  }
              }}
            />
              {/* <PrivateRoute exact path="/" component={Profile} /> */}
              {/* <PrivateRoute exact path="/#/" component={Profile} /> */}
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path='/account' component={Account}/>
              <Route exact path='/editer' component= {EditProfile} />
              <Route exact path='/about' component= {About} />
              <Route exact path="/submissionform" component={SubmissionForm} />
            </Switch>
           </div> 
          </Fragment>   
         </HashRouter>
        </AlertProvider>
      </Provider>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
connect(mapStateToProps)(App);

ReactDOM.render(<App />, document.getElementById("app"));