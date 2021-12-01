import React, { Component, Fragment } from 'react'; 
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store  from "../store"; 
import Header from "./layout/Header";
import Dashboard from "./submissions/Dashboard";
import {Provider as AlertProvider} from "react-alert";
import AlertTemplate from 'react-alert-template-basic';


const alertOptions = {
  timeout:3000,
  position: 'top center'
}



class App extends Component {
  render() {
    return (
      // <div >
      //   Hello World
      // </div> 
      <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        {/* Hello bro */}
        <Fragment>
          <Header />
           <div className="container">
            <Dashboard />
          </div> 
        </Fragment>
        </AlertProvider>
      </Provider>
    );
  }
}
  
  ReactDOM.render(<App />, document.getElementById("app"));