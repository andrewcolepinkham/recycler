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


export class Profile extends Component {
  static propTypes = {
  };

  render() {
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
            <Row className = "p-5">
              <UserProfile/>
            </Row>
            <Row>
            <Col> <Submissions/> </Col>
            <Col> <Leaderboard/> </Col>
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

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  {}
)(Profile);