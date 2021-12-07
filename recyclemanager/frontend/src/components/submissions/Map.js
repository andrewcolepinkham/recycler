import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GoogleMapReact from 'google-map-react';

export class Map extends Component {
    static propTypes = {

    };



  componentDidMount() {
  }

  render() {
    return (
      <Fragment>
        <h2>Find a Recycling Center</h2>
        <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
            // apiKey={"AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U"}
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={38.8598724}
              lng={-104.8230056}
              text="Colorado College"
            />
          </GoogleMapReact>
        </div>
      </Fragment>
    );
  }
}
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const defaultProps = {
  center: {
    lat: 38.8598724,
    lng: -104.8230056
  },
  zoom: 10
};

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
)(Map);