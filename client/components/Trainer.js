import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MapContainer from '../containers/MapContainer';
import ReviewForm from './ReviewForm';
import Loading from './Loading';

const Trainer = ({ 
    coordinates, 
    reviewSent, 
    interestRegistered,
    handleInterestSubmission,
    handleReviewSubmission,
    reviews, 
    profile, 
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

                <ReviewForm submitReview={handleReviewSubmission} />
                {!reviews ? null : <div className="review-list">
                    {reviews.map((review) => 
                        <div key={review._id} className="review-card">
                            <div>{review.authorName}</div>
                            <img src={review.authorAvatar}/>
                            <div>{review.rating}</div>
                            <div>{review.body}</div>
                        </div> 
                    )}
                </div>}
            </div>
        }
    </div>
)

Trainer.propTypes = { 
    reviewSent: PropTypes.bool.isRequired, 
    interestRegistered: PropTypes.bool.isRequired,
    handleInterestSubmission: PropTypes.func.isRequired,
    handleReviewSubmission: PropTypes.func.isRequired, 
}

export default Trainer;