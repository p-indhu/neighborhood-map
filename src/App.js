import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapsContainer from "./Container";
import MapContainer from './MapContainer';
class App extends Component {
    state = {
      locations : [
        {type: 'parks', title: 'Rainbow Family Park', location: {lat: 36.1494732, lng: -115.2480869}},
        {type: 'parks', title: 'Rainbow Family Park2', location: {lat: 36.1994732, lng: -115.2180869}},
        {type: 'parks', title: 'Rainbow Family Park3', location: {lat: 36.1294732, lng: -115.2680869}},
        {type: 'restaurants', title: 'Rainbow Family Restaurant4', location: {lat: 36.1394732, lng: -115.2280869}},
        {type: 'restaurants', title: 'Rainbow Family Restaurant5', location: {lat: 36.1794732, lng: -115.2880869}},
        {type: 'restaurants', title: 'Rainbow Family Restaurant6', location: {lat: 36.1194732, lng: -115.2380869}}
      ],
      locationType : 'all',
      selectedLocations : [
        {type: 'parks', title: 'Rainbow Family Park', location: {lat: 36.1494732, lng: -115.2480869}},
        {type: 'parks', title: 'Rainbow Family Park2', location: {lat: 36.1994732, lng: -115.2180869}},
        {type: 'parks', title: 'Rainbow Family Park3', location: {lat: 36.1294732, lng: -115.2680869}},
        {type: 'restaurants', title: 'Rainbow Family Restaurant4', location: {lat: 36.1394732, lng: -115.2280869}},
        {type: 'restaurants', title: 'Rainbow Family Restaurant5', location: {lat: 36.1794732, lng: -115.2880869}},
        {type: 'restaurants', title: 'Rainbow Family Restaurant6', location: {lat: 36.1194732, lng: -115.2380869}}
      ],
      selectedLocation : ''
    }

    changeLocationType(event) {
        //console.log(event.target.value);
        this.setState({locationType : event.target.value});
        this.setState({selectedLocation: ''});
        this.listLocations(event.target.value);

        //console.log(this.state.locationType);
    }

    listLocations(type) {
        let selectedLocations = [];
        if(type === 'all') {
            selectedLocations = this.state.locations;
        }
        else {
            selectedLocations = this.state.locations.filter(location => location.type===type)
        }

        this.setState({selectedLocations : selectedLocations});
    }

    locationClicked(event) {
        console.log(event.target.innerHTML);
        this.setState({selectedLocation : event.target.innerHTML})
    }

    render() {
      return (
          //<div className="App">
          //    <header className="App-header">
          //        <h1 className="App-title">Explore Vegas Restaurants</h1>
          //    </header>
          //</div>
          <div className="App">
              <div>
                  <select onChange={(event) => this.changeLocationType(event)}>
                      <option value='all'>All</option>
                      <option value='restaurants'>Restaurants</option>
                      <option value='parks'>Parks</option>
                  </select>
              </div>
              <div>
                  <ul>
                      {
                          this.state.selectedLocations.map(location => (
                              <li key={location.title} onClick={(event) => this.locationClicked(event)}>
                                  {location.title}
                              </li>
                          ))
                      }
                  </ul>
              </div>
              <MapContainer
                  locations={this.state.locations}
                  locationType={this.state.locationType}
                  selectedLocation={this.state.selectedLocation}
              />
          </div>
    );
  }
}

export default App;
