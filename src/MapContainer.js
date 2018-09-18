/* global google */
import React, { Component } from 'react';
class MapContainer extends React.Component {
  state = {
    map : {},
    markers : []
  }
  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        const API = 'AIzaSyCEp40X2JY3Rx4d9XjsW6jBc9aE8m-gE1o';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {
      const rainbowPark = {lat: 36.1494732, lng: -115.2480869};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: rainbowPark
      });
      let markers = this.state.markers;
      var bounds = new google.maps.LatLngBounds();
      let infoWindow = new google.maps.InfoWindow();
      let locations = this.props.locations;
      for(let i=0; i<locations.length; i++) {
        let position = locations[i].location;
        let title = locations[i].title;
        let marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i,
          placetype: locations[i].type
        });
        markers.push(marker);
        bounds.extend(marker.position);
        marker.addListener('click', function() {
          if(infoWindow.marker != marker) {
            infoWindow.marker = marker;
            infoWindow.setContent('<div>' + marker.title + '</div>');
            infoWindow.open(map,marker);
            infoWindow.addListener('closeclick', function() {
              infoWindow.setMarker(null);
            });
          }
        });
      }
      map.fitBounds(bounds);
      this.setState({map});
      this.setState({markers});
      this.filter(this.props.locationType);
    });
  }

  filter(locationType, selectedLocation) {
    console.log("filter called");
    //let bounds = new google.maps.LatLngBounds();
    let markers = this.state.markers;
    let map = this.state.map;
    if(locationType === 'restaurants') {
        for(let i=0; i<markers.length; i++) {
            if(markers[i].placetype !== 'restaurants')
                markers[i].setMap(null);
            else {
                markers[i].setMap(map);
                if(markers[i].title === selectedLocation) {
                    markers[i].setAnimation(google.maps.Animation.BOUNCE);
                }
                else {
                    markers[i].setAnimation(null);
                }
            }
        }
    }
    else if(locationType === 'parks') {
        for(let i=0; i<markers.length; i++) {
            if(markers[i].placetype !== 'parks')
                markers[i].setMap(null);
            else {
                markers[i].setMap(map);
                if(markers[i].title === selectedLocation) {
                    markers[i].setAnimation(google.maps.Animation.BOUNCE);
                }
                else {
                    markers[i].setAnimation(null);
                }
            }
        }
    }
    else if(locationType === 'all') {
        for(let i=0; i<markers.length; i++) {
            markers[i].setMap(map);
            if(markers[i].title === selectedLocation) {
                markers[i].setAnimation(google.maps.Animation.BOUNCE);
            }
            else {
                markers[i].setAnimation(null);
            }
        }
    }
  }

  //
  // filter(event) {
  //   console.log(event.target.value);
  //   let bounds = new google.maps.LatLngBounds();
  //   let markers = this.state.markers;
  //   let map = this.state.map;
  //   if(event.target.value === 'restaurants') {
  //       for(let i=0; i<markers.length; i++) {
  //           if(markers[i].placetype !== 'restaurants')
  //               markers[i].setMap(null);
  //           else {
  //               markers[i].setMap(map);
  //           }
  //       }
  //   }
  //   else if(event.target.value === 'parks') {
  //       for(let i=0; i<markers.length; i++) {
  //           if(markers[i].placetype !== 'parks')
  //               markers[i].setMap(null);
  //           else {
  //               markers[i].setMap(map);
  //           }
  //       }
  //   }
  //   else if(event.target.value === 'all') {
  //       for(let i=0; i<markers.length; i++) {
  //           markers[i].setMap(map);
  //       }
  //   }
  // }

  render() {
    return (
      <div>
        <div id="map" style={{width: '100vw', height: '100vh'}}>
            {
              this.filter(this.props.locationType, this.props.selectedLocation)
            }
        </div>
      </div>
    )
  }
}

export default MapContainer;
