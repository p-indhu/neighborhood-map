import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import MapContainer from './MapContainer';
import FilterArea from './FilterArea';
import FilterList from './FilterList';
class App extends Component {
    state = {
        //Locations data for the App (Can be fetched from external resources in future enhancements)
        locations : [
          {type: 'parks', title: 'Rainbow Family Park', location: {lat: 36.1494732, lng: -115.2480869}, foursquareId: '4bc76c4b6501c9b6d5673e29'},
          {type: 'parks', title: 'All American Park', location: {lat: 36.1555084, lng: -115.2649268}, foursquareId: '4bc506306c6f9c74b5e6b3fc'},
          {type: 'parks', title: 'Dessert Breeze Park', location: {lat: 36.1252817, lng: -115.2713363}, foursquareId: '4c8ab436a92fa09395cb93bf'},
          {type: 'restaurants', title: 'Macayos Mexican Kitchen', location: {lat: 36.1435189, lng: -115.2707008}, foursquareId: '4aac656cf964a520d25d20e3'},
          {type: 'restaurants', title: 'Black Bear Diner', location: {lat: 36.1794732, lng: -115.2880869}, foursquareId: '578f6d55498ec5b9e0a60af0'},
          {type: 'restaurants', title: 'Paymons Mediterranean Café', location: {lat: 36.1194732, lng: -115.2380869}, foursquareId: '43ceb761f964a520df2d1fe3'}
        ],
        //Filter for locations - can be 'all', 'parks' and 'restaurants'
        locationType : 'all',
        //Currently displayed locations after filtering (default to 'all' locations)
        selectedLocations : [
          {type: 'parks', title: 'Rainbow Family Park', location: {lat: 36.1494732, lng: -115.2480869}, foursquareId: '4bc76c4b6501c9b6d5673e29'},
          {type: 'parks', title: 'All American Park', location: {lat: 36.1994732, lng: -115.2180869}, foursquareId: '4bc506306c6f9c74b5e6b3fc'},
          {type: 'parks', title: 'Dessert Breeze Park', location: {lat: 36.1294732, lng: -115.2680869}, foursquareId: '4c8ab436a92fa09395cb93bf'},
          {type: 'restaurants', title: 'Macayos Mexican Kitchen', location: {lat: 36.1394732, lng: -115.2280869}, foursquareId: '4aac656cf964a520d25d20e3'},
          {type: 'restaurants', title: 'Black Bear Diner', location: {lat: 36.1794732, lng: -115.2880869}, foursquareId: '578f6d55498ec5b9e0a60af0'},
          {type: 'restaurants', title: 'Paymons Mediterranean Café', location: {lat: 36.1194732, lng: -115.2380869}, foursquareId: '43ceb761f964a520df2d1fe3'}
        ],
        //Single location that is selected by user to view details
        selectedLocation : ''
    }

    // Sets state when location filter is changed
    changeLocationType = (event) => {
        this.setState({locationType : event.target.value});
        this.setState({selectedLocation: ''});
        this.listLocations(event.target.value);
    };

    // Sets state when a single location is clicked
    locationClicked = (event) => {
        console.log(event.target.innerHTML);
        document.getElementById('sidebar').classList.remove('open');
        this.setState({selectedLocation : event.target.innerHTML})
    };

    // Lists locations according to selected filter
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

    // Handles clicking of the hamburger menu to show the sidebar content
    menuClicked(event) {
        document.getElementById('sidebar').classList.toggle('open');
        document.getElementById('select-filter').focus();
        event.stopPropagation();
    }

    render() {
        return (
            <div className="App">
                <aside id="sidebar">
                    <FilterArea changeLocationType={this.changeLocationType} />
                    <FilterList
                        selectedLocations={this.state.selectedLocations}
                        locationClicked={this.locationClicked}
                    />
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
