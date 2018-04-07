import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContainer from '../containers/MapContainer';
import ReviewForm from './ReviewForm';
import Loading from './Loading';

const Trainer = ({
    componentState: { coordinates, reviewSent, interestRegistered, currentPage },
    handleInterestSubmission,
    handleReviewSubmission,
    handlePageClick,
    profile,
    currentReviewResults,
    pageNumbers
}) => ( 
    <div className="review-container">
        {!profile ? <Loading /> : 
            <div className="trainer single-view">
                <h3>Trainer Name</h3>
                <div>{profile.name}</div>
                <img src={profile.avatar}/>
                <h3>Trainer Bio</h3>
                <div>{profile.bio}</div>
                <h3>Hourly rate</h3>
                <div>{profile.region}</div>
                <div>{profile.base}</div>
                <div>{profile.notes}</div>
                {!interestRegistered ? <button onClick={() => handleInterestSubmission()} className="interest">Register interest!</button> : <button className="interest-disable" disabled >Interest registered!</button>}

                {!coordinates ? <Loading /> : <MapContainer base={profile.base} radius={profile.radius} coordinates={coordinates}/>}

                {reviewSent ? <Loading text={'Processing review'}/> : null}

                {!reviewSent ? <ReviewForm submitReview={handleReviewSubmission} /> : null}
                
                <div className="review-list">
                    {currentReviewResults.map((review) => 
                        <div key={review._id} className="review-card">
                            <div>{review.authorName}</div>
                            <img src={review.authorAvatar}/>
                            <div>{review.rating}</div>
                            <div>{review.body}</div>
                        </div> 
                    )}
                </div>
                <ul className="page-numbers">
                    {pageNumbers.map((number) => (
                        <li className={currentPage === number ? 'current-page' : 'page'}
                            id={number} 
                            key={number} 
                            onClick={handlePageClick}
                        >
                            {number}
                        </li>
                    ))}
                </ul>
            </div>
        }
    </div>
)

Trainer.propTypes = {
    pageNumbers: PropTypes.array.isRequired,
    state: PropTypes.object.isRequired,
    currentReviewResults: PropTypes.array.isRequired,
    handleInterestSubmission: PropTypes.func.isRequired,
    handleReviewSubmission: PropTypes.func.isRequired, 
}

export default Trainer;