import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import { getPlaces } from "../../actions/google";
import GoogleMapComponent from  "./GoogleMapComponent";
// import * as Permissions from 'expo-permissions';
// import * as Location from 'expo-location';

export class MyMap extends Component {
  // constructor(props){
  //   super(props)
  //   this.handleRestaurantSearch = this.handleRestaurantSearch.bind(this);
  //   this.props.getPlaces(38.8598724, -104.8230056, 'restaurant', 'AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U', 2000);
  // }
  
  // static propTypes = {
  //   google: PropTypes.object.isRequired,
  //   getPlaces: PropTypes.func.isRequired
  // };
  
//   componentDidMount() {
//     this.props.getPlaces(38.8598724, -104.8230056, 'restaurant', 'AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U', 2000);
//   }
//   handleRestaurantSearch() {
//     console.log("handleResturantSearch");
//     this.props.getPlaces(38.8598724, -104.8230056, 'restaurant', 'AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U', 2000);
//     const { places } = this.props.google;
//   };

//   mapComp(){
//     console.log(this.props)
//     return (
//       <Fragment>
//         {/* <button onClick={() => console.log("here")}> */}
//         <GoogleMap defaultZoom={10} defaultCenter={{lat:38.8598724, lng: -104.8230056}}/>
//         {/* {this.props.places.map((place) => (
//           <div>
//             <div>{place.geometry.location.lat}</div>
//             <Marker
//               key={`${place.geometry.location.lat}-${place.geometry.location.lng}`}
//               position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }}
//               // onClick={() => {
//               //   setSelected(place);
//               // }}
//               icon={{
//                 // url: `/bear.svg`,
//                 // origin: new window.google.maps.Point(0, 0),
//                 // anchor: new window.google.maps.Point(15, 15),
//                 // scaledSize: new window.google.maps.Size(30, 30),
//               }}
//             />
//           </div> 
//           ))} */}
//       </Fragment>

//     );
// };

  render() {
    const WrappedMap = withScriptjs(withGoogleMap(GoogleMapComponent))
    return (
      <div>
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
  google: state.google
});
export default connect(mapStateToProps, {getPlaces})(MyMap);

// function Search(){
//   const {lat, lng} = {lat:38.8598724, lng: -104.8230056}
//   const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' + lat + ',' + lng + '&radius=100&type=restaurant&key=AIzaSyCTWH7f7kKSSKxYvM9Hi1Tx9I9W-ODi35U';
//     fetch(url)
//       .then((response) => response.json())
//       .then((JsonResponse) => {
//           // console.error(JsonResponse)
//           console.log(JsonResponse)
//       })
//       .catch((error) => {
//         console.log(error)
//           alert('error')
//       });
// }
// async getLocationAsync () {
//   const { status } = await Permissions.askAsync(
//     Permissions.LOCATION
//   );
//   if (status === 'granted') {
//     let location = await Location.getCurrentPositionAsync({});
//     this.setState({
//       hasLocationPermissions: true,
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//     });
//   } else {
//     alert('Location permission not granted');
//   }
// };



