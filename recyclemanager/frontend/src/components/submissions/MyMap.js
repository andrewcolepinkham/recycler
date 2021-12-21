import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import { getPlaces } from "../../actions/google";
import GoogleMapComponent from  "./GoogleMapComponent";


export class MyMap extends Component {
  render() {
    const WrappedMap = withScriptjs(withGoogleMap(GoogleMapComponent))
    return (
      <div className="card border-info card-body mt-6 mb-6" >
        <h2 style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>Find Recycling Centers</h2>
        < WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(MyMap);



