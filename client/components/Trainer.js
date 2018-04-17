import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapContainer from '../containers/MapContainer';
import Review from './Review';
import Profile from './Profile';
import Loading from './Loading';
import styles from '../styles/components/trainer.css';

const Trainer = ({
    componentState: { coordinates, reviewSent, interestRegistered, currentPage },
    handleInterestSubmission,
    profile,
    reviews,
    reviewAverage
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
                    <h3><i className="fas fa-chevron-circle-up"></i> Like what you see? Check the areas covered by the trainer below. If you're happy, register your interest with them today! </h3>
    
                    {!coordinates ? <Loading color='white'/> : <MapContainer base={profile.base} radius={profile.radius} coordinates={coordinates}/>}
                </div>
                
                <div className={styles.bottomContainer}>
                    <h3>Leaving trainer reviews encourages accountability - tell us about your exprerience below.</h3>
                    <Review />
                </div>

            </div>
        }
    </div>
)

Trainer.propTypes = {
    profile: PropTypes.object.isRequired,
    reviews: PropTypes.array.isRequired,
    reviewAverage: PropTypes.number,
    handleInterestSubmission: PropTypes.func.isRequired,
    componentState: PropTypes.object.isRequired,
    userId: PropTypes.string,
    trainerId: PropTypes.string,
    state: PropTypes.object
}

export default Trainer;