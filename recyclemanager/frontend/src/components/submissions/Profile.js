import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Image from 'react-bootstrap/Image';
import Submissions from './submissions';
import {Container ,Row, Col} from "react-bootstrap"
import UserProfile from './UserProfile';
import Leaderboard from "./Leaderboard";
import MyMap from "./MyMap";
import Nav from 'react-bootstrap/Nav'
import { Route, Redirect } from 'react-router-dom';
import { MDBSpinner } from 'mdb-react-ui-kit';

export class Profile extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  render() {
    console.log("authed?")
    console.log(this.props.isAuthenticated)
    if(this.props.isAuthenticated === null){
      return <MDBSpinner role='status'>
              <span className='visually-hidden'>Loading...</span>
            </MDBSpinner>
    }
    if(this.props.isAuthenticated === false){
      return <Redirect to="/login" />;
    }
    if(this.props.isAuthenticated){
      return (
        <Container className = "p-5">
            <Container className = "p-5">
              <Row className = "p-5">
                <UserProfile/>
              </Row>
              <Row>
                <Col> 
                  <Submissions/> 
                </Col>
                <Col> 
                  <Leaderboard/> 
                </Col>
              </Row>
              <Row className = "p-5">
                <Col> < MyMap/> </Col>
              </Row>
            </Container>
        </Container>
        
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Profile);