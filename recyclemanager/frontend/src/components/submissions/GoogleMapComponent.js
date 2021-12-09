import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import { getPlaces } from "../../actions/google";
// import * as Permissions from 'expo-permissions';
// import * as Location from 'expo-location';

export class GoogleMapComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
        hasPlacesLoaded: false,
    }
    this.handleRestaurantSearch = this.handleRestaurantSearch.bind(this);
}
  
  static propTypes = {
    google: PropTypes.object.isRequired,
    getPlaces: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    if(this.state.hasPlacesLoaded == false){
        // this.props.getPlaces(38.8598724, -104.8230056, 'restaurant', 'AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U', 2000);
        this.setState({
            hasPlacesLoaded: true,
        })

    }
  }
  handleRestaurantSearch() {
    console.log("handleResturantSearch");
    this.props.getPlaces(38.8598724, -104.8230056, 'restaurant', 'AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U', 2000);
  };
  render() {
    const { places } = this.props.google;
    return (
        <div>
            <GoogleMap defaultZoom={10} defaultCenter={{lat:38.8598724, lng: -104.8230056}}/>
            {places.map((place) => (
                <div> 
                <Marker
                    key={`${place.geometry.location.lat}-${place.geometry.location.lng}`}
                    position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
                    // onClick={() => {
                    //   setSelected(place);
                    // }}
                    // icon={{
                    // // url: `/bear.svg`,
                    // // origin: new window.google.maps.Point(0, 0),
                    // // anchor: new window.google.maps.Point(15, 15),
                    // // scaledSize: new window.google.maps.Size(30, 30),
                    // }}
                />
                </div> 
                ))}
            <button onClick={this.handleRestaurantSearch}>
                <div>Find Recycling Centers</div>
            </button>
        </div>
        
    );
  }
}

const mapStateToProps = state => ({
  google: state.google
});
export default connect(mapStateToProps, {getPlaces})(GoogleMapComponent);



