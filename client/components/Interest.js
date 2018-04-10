import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/interest.css';

const Interest = ({ requests, trainerId, handleRemoveInterest }) => (
    <div className={styles.background}>
        {!requests.length ? <p className={styles.noRequests}>No requests found...</p> :
            <div className={styles.interestContainer}>  
                {requests.map(({ requestee, _id }) => (
                    <div key={_id} className={styles.card}>
                        <img className={styles.avatar} src={requestee.profile.avatar}/>
                        <div className={styles.info}>
                            <div><span className={styles.email}>User email: </span>{requestee.email}</div> 
                            <div><span className={styles.username}>Username: </span>{requestee.profile.name}</div> 
                        </div>
                        <div className={styles.bioContainer}>
                            <h4 className={styles.bio}>User bio</h4>
                            <div>{requestee.profile.bio}</div>
                        </div>
                        <div className={styles.contactedContainer}>
                            <div className={styles.contacted}>
                                <span>Already contacted the user?</span>
                                <button onClick={() => {
                                    handleRemoveInterest(_id);
                                }}>Remove request</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        }
    </div>   
)

Interest.propTypes = {
    requests: PropTypes.array.isRequired,
    trainerId: PropTypes.string.isRequired,
    handleRemoveInterest: PropTypes.func.isRequired
}

export default Interest;