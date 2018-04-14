import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import handleReviewStars from '../utils/reviewStars';
import styles from '../styles/components/profile.css';

const Profile = ({ 
    profile: { 
        avatar, 
        bio, 
        name, 
        rate, 
        region, 
        base, 
        radius, 
        notes 
    },
    reviews,
    reviewAverage,
    locationState,
    updateLink,
    interestRegistered
}) => (
    <div className={styles.background}>
        {locationState && locationState.profileUpdated ? <div className={styles.updateSuccess}>Profile updated!</div> : null}
    
        <div className={styles.profileContainer}>
            <div className={styles.card}>
                <div className={!rate ? styles.clientTop : styles.top}>
                    <div className={styles.avatar}>
                        <div className={styles.imgContainer}>
                            <img src={avatar}/>
                        </div>
                    </div>

                    <div className={styles.nameAndReview}>
                        <h2>{name}</h2>
                        {reviews.length ? <div className={styles.reviewInfo}>
                            {handleReviewStars(reviewAverage)}
                            <div>({reviews.length})</div>
                        </div> : null}
                    </div>

                    {!rate ? null : <div className={styles.info}>
                        <span>{base}</span> |
                        <span>{region}</span> |
                        <span>£{rate}</span> |
                        <span>{radius} mile radius</span>
                    </div>}

                    {!notes ? null : <div className={styles.notes}>
                        <h4>Area notes</h4>
                        <div>{notes}</div>
                    </div>}

                    {typeof updateLink !== 'function' ? 
                        <Link 
                            className={!rate ? styles.clientUpdate : styles.update} to='/portal/update'
                        >
                            Update profile
                        </Link> : 
                        <button 
                            className={interestRegistered ? styles.disable : styles.interest} 
                            onClick={() => updateLink()} 
                            disabled ={interestRegistered ? true : false}
                        >
                            {interestRegistered ? 'Interest registered' : 'Register interest'}
                        </button>}
                </div>

                <div className={styles.bottom}> 
                    <div className={styles.bio}>{bio}</div>
                </div>
            </div>
        </div>
    </div>
)

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    reviews: PropTypes.array,
    reviewAverage: PropTypes.number,
    locationState: PropTypes.object,
    updateLink: PropTypes.func,
    interestRegistered: PropTypes.bool,
    userType: PropTypes.string,
    requestSuccess: PropTypes.bool,
    requestPending: PropTypes.bool,
    id: PropTypes.string
}

export default Profile;