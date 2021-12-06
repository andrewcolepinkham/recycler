import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Map extends Component {
    static propTypes = {

    };


  componentDidMount() {
  }

  render() {
    return (
      <Fragment>
        <h2>Map</h2>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
)(Map);