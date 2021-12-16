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



export class Profile extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  render() {
    if(!this.props.isAuthenticated){
      return <Redirect to="/login" />;
    }
    return (
      <Container className = "p-5">
        {/* <Col>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">Active</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav>
        </Col> */}
        {/* <Col> */}
          <Container className = "p-5">
          {/* <div>
          <div class="progress">
            <div class="progress-bar progress-bar-striped " role="progressbar" style={{width:"10%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{width:"25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" style={{width:"50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style={{width:"75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style={{width:"100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div> */}
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
        {/* </Col> */}
      </Container>
      
    );
    
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Profile);