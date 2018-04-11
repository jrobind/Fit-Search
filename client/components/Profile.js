import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    locationState,
    updateLink
}) => (
    <div className={styles.profileContainer}>
    {locationState && locationState.profileUpdated ? <div className={styles.updateSuccess}>Profile updated!</div> : null}
    <div className={styles.card}>
            <div className={styles.infoMain}>
                <div className={styles.titleAvatar}>
                    <h1 className={styles.title}>{name}</h1>
                    <div className={styles.imgContainer}>
                        <img src={avatar}/>
                    </div>
                </div>
                <div className={styles.info}>
                    {rate ? <div><span className={styles.infoBold}>Hourly rate: </span> £{rate}</div> : null}
                    {region ? <div><span className={styles.infoBold}>Region:</span> {region}</div> : null}
                    {base ? <div><span className={styles.infoBold}>Based out of: </span>{base}</div> : null}
                    {radius ? <div><span className={styles.infoBold}>Radius covered: </span>{radius}</div> : null}
                    {notes ? <div className={styles.areaNotes}><h4 className={styles.infoBold}>Area notes</h4>{notes}</div> : null}
                </div>
            </div>
            <div className={styles.bio}>{bio}</div>
            {updateLink ? <Link className={styles.update} to='/portal/update'>Update profile</Link> : null}
        </div>
    </div>
)

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    locationState: PropTypes.object,
    updateLink: PropTypes.bool.isRequired
}

export default Profile;
