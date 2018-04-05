import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatMessage from '../utils/formatMessage';


const CurrentQuery = (props) => (
    <div className="current-query-container">
        <div>
            <button onClick={() => props.resetSearch()}>Reset search</button>
            <h3>Current search filter:</h3>
            <h4>{formatMessage(props.currentQuery)}</h4>
        </div>
    </div>
);

CurrentQuery.propTypes = {
    resetSearch: PropTypes.func.isRequired,
    currentQuery: PropTypes.string.isRequired
}


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            starsClicked: false,
            rateClicked: false,
            locationSubmitted: false
        }
        
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.handleSearchSelection = this.handleSearchSelection.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }
    
    resetSearch() {
        this.setState(() => ({
            location: '',
            starsClicked: false,
            rateClicked: false,
            locationSubmitted: false
        }));
        
        this.props.handleUpdateSearch(null, true);
    }
    
    handleSearchSelection(type, query) { 
        switch(type) {
            case 'stars' :
                this.props.handleUpdateSearch(query);
                this.setState(() => ({starsClicked: true}));
                break;
            case 'rate' :
                this.props.handleUpdateSearch(query);
                this.setState(() => ({rateClicked: true}));
                break;
            case 'location' : 
                this.props.handleUpdateSearch(query);
                this.setState(() => ({locationSubmitted: true}));
                break;
        }
    }
    
    handleSubmission(e) {
        e.preventDefault();
        e.target.reset();

        this.handleSearchSelection('location', this.state.location);
        this.setState(() => ({location: ''}));
    }
    
    handleSelect(e) {
        const val = e.target.value;
        
        this.setState(() => ({
            location: val
        }));
    }
    
    render() {
        const { searchResults, currentQuery } = this.props;
        const { starsClicked, rateClicked, locationSubmitted } = this.state;
        
        return(
            <div className="search-toggle-container">
                <CurrentQuery currentQuery={currentQuery} resetSearch={this.resetSearch}/>
                <div className="toggle-reviews">
                    <h5>Average Trainer Review</h5>
                    <a onClick={() => !starsClicked ? this.handleSearchSelection('stars', '5') : null}><img src={require('../../images/ratings-5.png')}/></a>
                                                                                      
                    <a onClick={() => !starsClicked ? this.handleSearchSelection('stars', '4') : null}><img src={require('../../images/ratings-4.png')}/></a>
                                                                                      
                    <a onClick={() => !starsClicked ? this.handleSearchSelection('stars', '3') : null}><img src={require('../../images/ratings-3.png')}/></a>
                                                                                      
                    <a onClick={() => !starsClicked ? this.handleSearchSelection('stars', '2') : null}><img src={require('../../images/ratings-2.png')}/></a>
                                                                                      
                    <a onClick={() => !starsClicked ? this.handleSearchSelection('stars', '1') : null}><img src={require('../../images/ratings-1.png')}/></a>          
                </div>
                <div className="hourly">
                    <h5>Trainer hourly rate</h5>
                    <a onClick={() => !rateClicked ? this.handleSearchSelection('rate', '<25') : null}>under £25</a>
                    <a onClick={() => !rateClicked ? this.handleSearchSelection('rate', '25-35') : null}>£25-35</a>
                    <a onClick={() => !rateClicked ? this.handleSearchSelection('rate', '35-45') : null}>£35-45</a>
                    <a onClick={() => !rateClicked ? this.handleSearchSelection('rate', '45-55') : null}>£45-55</a>
                    <a onClick={() => !rateClicked ? this.handleSearchSelection('rate', '55>') : null}>over £55</a>
                </div>
                <h5>Trainer location</h5>
                <form onSubmit={this.handleSubmission}>
                    <select value={this.state.location} onChange={this.handleSelect}>
                        <option value="" disabled>Select your region</option>
                        <option>London</option>
                        <option>South West</option>
                        <option>South East</option>
                        <option>East of England</option>
                        <option>East Midlands</option>
                        <option>West Midlands</option>
                        <option>Yorkshire and the Humber</option>
                        <option>North West</option>
                        <option>North East</option>
                    </select>
                    <input type="submit" disabled={(this.state.locationSubmitted) ? 'disabled' : ''} value="Go" />
                </form>
            </div>
        )
    }
}

SearchBar.propTypes = {
    searchResults: PropTypes.array.isRequired,
    handleUpdateSearch: PropTypes.func.isRequired,
    currentQuery: PropTypes.string.isRequired
}

export default SearchBar;