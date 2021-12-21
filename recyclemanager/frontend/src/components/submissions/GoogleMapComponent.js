import React, { Component, Fragment} from "react";
import {Button} from 'react-bootstrap';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import { getPlaces } from "../../actions/google";
import mapStyles from "../../mapStyles";


export class GoogleMapComponent extends Component {
  constructor(props){
    
    super(props)
    this.state = {
        hasPlacesLoaded: false,
        center: {lat:38.8598724, lng: -104.8230056},
        mapRef: null,
        clickedLatLng: null,
        selectedPlace: null
    }
   
}
  
  static propTypes = {
    google: PropTypes.object.isRequired,
    getPlaces: PropTypes.func.isRequired
  };
  
  componentDidMount() {
  
    this.props.getPlaces(this.state.center.lat, this.state.center.lng, 5000, 'recycling');
  }
  handlePlacesSearch() {
    this.props.getPlaces(this.state.center.lat, this.state.center.lng, 5000, 'recycling');
  };


  render() {
    const { places } = this.props.google;
    const mapContainerStyle = {
      height: "300px",
      width: "100%"
    };
    return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
            <GoogleMap 
              defaultZoom={12} 
              defaultCenter={{lat:38.8598724, lng: -104.8230056}}
              defaultOptions={{styles: mapStyles}}
             
              mapContainerStyle={mapContainerStyle}
            >
              
              {places ? places.map((place) => (
                <Marker
                  key={place.geometry.location.lat + place.geometry.location.lng}
                  position={{ 
                    lat: place.geometry.location.lat, 
                    lng: place.geometry.location.lng 
                  }}
                  onClick={() => {
                    this.setState({selectedPlace: place});
                  }}
                  icon={{
                    url:"/media/icons/recover.svg",
                    scaledSize: new window.google.maps.Size(25,25)
                  }}
                />
              )) : <></>}
              {this.state.selectedPlace && (
                <InfoWindow
                  position={{ 
                    lat: this.state.selectedPlace.geometry.location.lat, 
                    lng: this.state.selectedPlace.geometry.location.lng 
                  }}
                  onCloseClick={() => {
                    this.setState({selectedPlace: null});
                  }} 
                >
                  <div>
                    <h6 style={{color: 'black', textAlign: 'center'}}>{this.state.selectedPlace.name}</h6>
                    <p style={{color: 'black', textAlign: 'center'}}>{this.state.selectedPlace.vicinity}</p>
                    <p style={{color: 'blue', textAlign: 'center'}}>Rating: {this.state.selectedPlace.rating}/5</p>
                  </div>
                </InfoWindow>
              )}
            <div>

            </div>
            </GoogleMap>
            {/* <Button variant="primary" onClick={this.handlePlacesSearch.bind(this)}>
              <div style={{width: '600px'}}> 
                <h5 style={{color: 'black', textAlign: 'center'}}>Go</h5>
              </div>
            </Button> */}
        </div>
        
    );
  }
}

const mapStateToProps = state => ({
  google: state.google
});
export default connect(mapStateToProps, {getPlaces})(GoogleMapComponent);



