import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContainer from '../containers/MapContainer';
import ReviewForm from './ReviewForm';
import Profile from './Profile';
import Loading from './Loading';
import handleReviewStars from '../utils/reviewStars';
import styles from '../styles/components/trainer.css';

const Trainer = ({
    componentState: { coordinates, reviewSent, interestRegistered, currentPage },
    handleInterestSubmission,
    handleReviewSubmission,
    handlePageClick,
    profile,
    currentReviewResults,
    pageNumbers
}) => ( 
    <div className={styles.trainerContainer}>
        {!profile ? <Loading /> : 
            <div className={styles.trainerCard}>
    
                <Profile profile={profile} updateLink={false}/>
                
                <div className={styles.middleContainer}>
                    {!interestRegistered ? <button onClick={() => handleInterestSubmission()} className={styles.interest}>Register interest!</button> : <button className={styles.interestDisable} disabled >Interest registered!</button>}

                    {!coordinates ? <Loading /> : <MapContainer base={profile.base} radius={profile.radius} coordinates={coordinates}/>}
                </div>
                
                <div className={styles.bottomContainer}>
                    {reviewSent ? <Loading text={'Processing review'}/> : null}

                    {!reviewSent ? <ReviewForm submitReview={handleReviewSubmission} /> : null}

                    <div className={styles.reviews}>
                        {currentReviewResults.map((review) => 
                            <div key={review._id} className={styles.reviewCard}>
                                <div className={styles.avatar}>
                                    <div className={styles.avatarImgContainer}>
                                        <img src={review.authorAvatar}/>
                                    </div>
                                    <span>{review.authorName}</span>
                                </div>
                                <div>{handleReviewStars(review.rating)}</div>
                                <div className={styles.reviewMessage}>{review.body}</div>
                            </div> 
                        )}
                    </div>
                    <ul className="pageNumbers">
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

            </div>
        }
    </div>
)

Trainer.propTypes = {
    pageNumbers: PropTypes.array.isRequired,
    state: PropTypes.object.isRequired,
    currentReviewResults: PropTypes.array.isRequired,
    handleInterestSubmission: PropTypes.func.isRequired,
    handleReviewSubmission: PropTypes.func.isRequired
}

export default Trainer;