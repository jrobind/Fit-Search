import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Loading from './Loading';
import handleReviewStars from '../utils/reviewStars';
import styles from '../styles/components/search.css';

const Search = ({ 
    handleUpdateSearch, 
    searchResults, 
    componentState: { currentQuery, noResults, currentPage },
    currentSearchResults,
    pageNumbers,
    history, 
    handlePageClick,
}) => (
    <div className={styles.searchContainer}>
        <SearchBar 
            handleUpdateSearch={handleUpdateSearch} 
            searchResults={searchResults}
            currentQuery={currentQuery}
        />
        <div className={styles.results}>
            <div className={styles.trainerCardContainer}>
                {searchResults.length ? currentSearchResults.map(({ profile, _id, reviewAverage }) => (
                    <div className={styles.card} key={_id} onClick={() => {
                        history.push({
                            pathname: '/search/trainer',
                            state: {
                                trainerId: _id
                            }
                        });
                    }}>
                        <div className={styles.rate}><strong>£{profile.rate}</strong></div>
                        <h4>{profile.name}</h4>
                        
                        <div className={styles.imgContainer}>
                            <img src={profile.avatar}/>
                        </div>
                                                        
                        <div className={styles.trainerReviews}>
                            {reviewAverage === null ? 'No reviews just yet!' : handleReviewStars(reviewAverage)}
                        </div>
                            
                        <div><strong>{profile.base}</strong>, <strong>{profile.region}</strong></div>
                        
                        {profile.bio ? <div className={styles.bio}>{profile.bio.slice(0, 130)}... <span className={styles.readmore}> Find out more!</span></div> : <span>No bio just yet!</span>}
                    </div>

                )) : <div>{noResults ? 'NO RESULTS FOUND...' : <Loading />} </div>} 
            </div>
                <ul className="pageNumbers">
                    {pageNumbers.map((number) => (
                        <li className={currentPage === number ? 'currentPage' : 'page'}
                            id={number} 
                            key={number} 
                            onClick={handlePageClick}
                        >
                            {number}
                        </li>
                    ))}
                </ul>
        </div>
    </div>
);

Search.propTypes = {
    handleUpdateSearch: PropTypes.func.isRequired,
    searchResults: PropTypes.array.isRequired,
    componentState: PropTypes.object.isRequired,
    handlePageClick: PropTypes.func.isRequired,
    currentSearchResults: PropTypes.array.isRequired,
    pageNumbers: PropTypes.array.isRequired
}

export default withRouter(Search);