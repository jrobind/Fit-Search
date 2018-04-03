import React, { Component } from 'react';
import { handleGetSearchQuery } from '../actions/searchQuery';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchToggle from './SearchToggle';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noResults: false
        }
        
        this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
    }
    
    componentDidMount() {
        this.props.dispatch(handleGetSearchQuery('trainer'));

    }
    
    handleReviewStars(rating) {
        switch(rating) {
            case 1 :
                return <img src={require('../../images/ratings-1.png')} />
            case 2 :
                return <img src={require('../../images/ratings-2.png')} />
            case 3 : 
                return <img src={require('../../images/ratings-3.png')} />
            case 4 : 
                return <img src={require('../../images/ratings-4.png')} />
            case 5 :
                return <img src={require('../../images/ratings-5.png')} />
        }
    }
    
    handleUpdateSearch(searchValue) {
        this.props.dispatch(handleGetSearchQuery(searchValue))
            .then((data) => {
                if (!data.length) {
                    this.setState(() => ({noResults: true}));
                } else {
                    this.setState(() => ({noResults: false}));
                }
            });
    }
    
    render() {
        const { searchResults } = this.props.state;
        let message = this.state.noResults ? 'NO RESULTS FOUND...' : 'LOADING TRAINERS';
        
        return(
            <div className="search-container">
                <SearchToggle handleUpdateSearch={this.handleUpdateSearch} />
                <div className="search-results">
                    <div className="search-banner">
                        <h1>Trainer results</h1>
                        <p>When you find a trainer you like, why not drop them a message to book in your first session?</p>
                    </div>
                    <div className="trainer-card-container">
                        {searchResults.length ? searchResults.map(({ profile, _id, reviewAverage }) => (
                            <div className="trainer" key={_id} onClick={() => {
                                this.props.history.push({
                                    pathname: '/search/review',
                                    state: {
                                        trainerId: _id
                                    }
                                });
                            }}>
                                <h3>Trainer Name</h3>
                                <div>{profile.name}</div>
                                <img src={profile.avatar}/>
                                <h3>Trainer Bio</h3>
                                <div>{profile.bio}</div>
                                <h3>Hourly rate</h3>
                                <div>£ {profile.rate}</div>
                                <h6>Region</h6>
                                <div>{profile.region}</div>
                                <h6>Based out of:</h6>
                                <div>{profile.base}</div>
                                <h6>areas covered notes:</h6>
                                <div>{profile.notes}</div>

                                <div className="trainer-reviews">Review average: {reviewAverage === null ? 'No reviews just yet!' : this.handleReviewStars(reviewAverage)}</div>
                                <Link className="review" to={{
                                    pathname: '/search/review', 
                                    state: {
                                        trainerId: _id 
                                    }
                                    }}>Leave a review!</Link>
                            </div>
                        )) : <p>{message}</p>}
                    </div>
                </div>
            </div>
        )   
    }
}

const mapStateToProps = (state) => ({
    state
})

export default connect(mapStateToProps)(Search);