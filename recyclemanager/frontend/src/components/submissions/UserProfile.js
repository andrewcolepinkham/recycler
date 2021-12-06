import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class UserProfile extends Component {
    static propTypes = {

    };


  componentDidMount() {
  }

  render() {
    return (
      <Fragment>
        <h2>Profile</h2>
        <div> Username </div>
        <div> Email </div>
        <div> Adress </div>
        <div> Score </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
)(UserProfile);