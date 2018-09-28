import React, { Component } from 'react';

// Renders a drop-down for filtering locations
class FilterArea extends Component {
    render() {
        return(
            <div id="filter-area">
                <label htmlFor="select-filter">Select Location Filter  </label>
                <select id="select-filter" onChange={(event) => this.props.changeLocationType(event)}>
                    <option value='all'>All</option>
                    <option value='restaurants'>Restaurants</option>
                    <option value='parks'>Parks</option>
                </select>
            </div>
        );
    }
}

export default FilterArea;
