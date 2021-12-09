import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Image from 'react-bootstrap/Image';
import Submissions from './submissions';
import {Container ,Row, Col} from "react-bootstrap"
import UserProfile from './UserProfile';
import Leaderboard from "./Leaderboard";
import MyMap from "./MyMap";


export class Profile extends Component {
  static propTypes = {
  };

  render() {
    return (
    
      <Container className = "p-5">
        <Row className = "p-5">
          <Col> <UserProfile/> </Col>
          <Col> <Submissions /> </Col>
        </Row>
        <Row className = "p-5">
          <Col> <Leaderboard/> </Col>
          <Col> < MyMap/> </Col>
        </Row>
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