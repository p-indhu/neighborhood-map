import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapsContainer from "./Container";
import MapContainer from './MapContainer';
class App extends Component {
    state = {
      locations : [
        {type: 'parks', title: 'Rainbow Family Park', location: {lat: 36.1494732, lng: -115.2480869}, foursquareId: '4bc76c4b6501c9b6d5673e29'},
        {type: 'parks', title: 'All American Park', location: {lat: 36.1555084, lng: -115.2649268}, foursquareId: '4bc506306c6f9c74b5e6b3fc'},
        {type: 'parks', title: 'Dessert Breeze Park', location: {lat: 36.1252817, lng: -115.2713363}, foursquareId: '4c8ab436a92fa09395cb93bf'},
        {type: 'restaurants', title: 'Macayos Mexican Kitchen', location: {lat: 36.1394732, lng: -115.2280869}, foursquareId: '4aac656cf964a520d25d20e3'},
        {type: 'restaurants', title: 'Black Bear Diner', location: {lat: 36.1794732, lng: -115.2880869}, foursquareId: '578f6d55498ec5b9e0a60af0'},
        {type: 'restaurants', title: 'Paymons Mediterranean Café', location: {lat: 36.1194732, lng: -115.2380869}, foursquareId: '43ceb761f964a520df2d1fe3'}
      ],
      locationType : 'all',
      selectedLocations : [
        {type: 'parks', title: 'Rainbow Family Park', location: {lat: 36.1494732, lng: -115.2480869}, foursquareId: '4bc76c4b6501c9b6d5673e29'},
        {type: 'parks', title: 'All American Park', location: {lat: 36.1994732, lng: -115.2180869}, foursquareId: '4bc506306c6f9c74b5e6b3fc'},
        {type: 'parks', title: 'Dessert Breeze Park', location: {lat: 36.1294732, lng: -115.2680869}, foursquareId: '4c8ab436a92fa09395cb93bf'},
        {type: 'restaurants', title: 'Macayos Mexican Kitchen', location: {lat: 36.1394732, lng: -115.2280869}, foursquareId: '4aac656cf964a520d25d20e3'},
        {type: 'restaurants', title: 'Black Bear Diner', location: {lat: 36.1794732, lng: -115.2880869}, foursquareId: '578f6d55498ec5b9e0a60af0'},
        {type: 'restaurants', title: 'Paymons Mediterranean Café', location: {lat: 36.1194732, lng: -115.2380869}, foursquareId: '43ceb761f964a520df2d1fe3'}
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
        document.getElementById('sidebar').classList.remove('open');
        this.setState({selectedLocation : event.target.innerHTML})
    }

    menuClicked(event) {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('select-filter').focus();
        event.stopPropagation();
    }

    render() {
      return (
          //<div className="App">
          //    <header className="App-header">
          //        <h1 className="App-title">Explore Vegas Restaurants</h1>
          //    </header>
          //</div>
          <div className="App">
              <aside id="sidebar">
                  <div id="filter-area">
                      <label for="select-filter">Select Location Filter  </label>
                      <select id="select-filter" onChange={(event) => this.changeLocationType(event)}>
                          <option value='all'>All</option>
                          <option value='restaurants'>Restaurants</option>
                          <option value='parks'>Parks</option>
                      </select>
                  </div>
                  <div id="filter-list">
                      <ul>
                          {
                              this.state.selectedLocations.map(location => (
                                  <li key={location.title}>
                                      <button type="button" onClick={(event) => this.locationClicked(event)}>
                                          {location.title}
                                      </button>
                                  </li>
                              ))
                          }
                      </ul>
                  </div>
              </aside>
              <main>
                  <header className="App-header">
                      <h1 className="App-title">Explore Vegas Parks and Restaurants</h1>
                      <button type="button" id="menu" className="fa fa-bars" aria-label="Location Filter Options"
                      onClick={(event) => this.menuClicked(event)}></button>
                  </header>

                  <MapContainer
                      locations={this.state.locations}
                      locationType={this.state.locationType}
                      selectedLocation={this.state.selectedLocation}
                  />
              </main>
          </div>
    );
  }
}

export default App;
