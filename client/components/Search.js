import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Loading from './Loading';

const Search = ({ 
    handleUpdateSearch, 
    handleReviewStars, 
    searchResults, 
    message, 
    history, 
    currentQuery 
}) => (
    <div className="search-container">
        <SearchBar 
            handleUpdateSearch={handleUpdateSearch} 
            searchResults={searchResults}
            currentQuery={currentQuery}
        />
        <div className="search-results">
            <div className="search-banner">
                <h1>Trainer results</h1>
                <p>When you find a trainer you like, why not drop them a message to book in your first session?</p>
            </div>
            <div className="trainer-card-container">
                {searchResults.length ? searchResults.map(({ profile, _id, reviewAverage }) => (
                    <div className="trainer" key={_id} onClick={() => {
                        history.push({
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

                        <div className="trainer-reviews">Review average: {reviewAverage === null ? 'No reviews just yet!' : handleReviewStars(reviewAverage)}</div>
                        <Link className="review" to={{
                            pathname: '/search/review', 
                            state: {
                                trainerId: _id 
                            }
                            }}>Leave a review!</Link>
                    </div>
                    )) : <div>{message ? 'NO RESULTS FOUND...' : <Loading />} </div>}
            </div>
        </div>
    </div>     
);

Search.propTypes = {
    handleUpdateSearch: PropTypes.func.isRequired,
    handleReviewStars: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired,
    message: PropTypes.bool.isRequired,
    currentQuery: PropTypes.string.isRequired
}

export default Search;