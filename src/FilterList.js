import React, { Component } from 'react';

// Renders a list of locations based on the selected filter
class FilterList extends Component {
    render() {
        let locationClicked = this.props.locationClicked;
        return(
            <div id="filter-list">
                <ul>
                    {
                        this.props.selectedLocations.map(location => (
                            <li key={location.title}>
                                <button type="button" onClick={(event) => locationClicked(event)}>
                                    {location.title}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default FilterList;
