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
    reviews,
    reviewAverage,
    currentReviewResults,
    pageNumbers
}) => ( 
    <div>
        {!profile ? <Loading /> : 
            <div className={styles.trainerContainer}>
                <div className={styles.topContainer}>
                    <Profile 
                        profile={profile} 
                        updateLink={handleInterestSubmission}
                        interestRegistered={interestRegistered}
                        reviewAverage={reviewAverage}
                        reviews={reviews}
                    />
                </div>
                
                <div className={styles.middleContainer}>
                    <h3><i className="fas fa-chevron-circle-up"></i> Like what you see? Check the area covered by the trainer below. If you're happy, register your interest with them today! </h3>
    
                    {!coordinates ? <Loading color='white'/> : <MapContainer base={profile.base} radius={profile.radius} coordinates={coordinates}/>}
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
                                <div className={styles.reviewInfo}>
                                    {handleReviewStars(review.rating)}
                                    <div className={styles.date}>{review.dateCreated}</div>
                                </div>
                                <div className={styles.reviewMessage}>{review.body}</div>
                            </div> 
                        )}
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
        }
    </div>
)

Trainer.propTypes = {
    pageNumbers: PropTypes.array.isRequired,
    state: PropTypes.object.isRequired,
    currentReviewResults: PropTypes.array.isRequired,
    handleInterestSubmission: PropTypes.func.isRequired,
    handleReviewSubmission: PropTypes.func.isRequired,
    componentState: PropTypes.object.isRequired
}

export default Trainer;