import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import styles from '../styles/components/profileForm.css';

const ProfileForm = ({ 
    userType, 
    handleInput, 
    handleSubmission,
    state,
    updatePending
}) => (
    <form className={styles.form} onSubmit={handleSubmission}>
        <div className={styles.default}>
            <label><span>* </span>Full name </label>
            <input 
                id='name' 
                type='text' 
                onChange={handleInput} 
                placeholder=' fullname' 
                value={state.name} 
                maxLength='30' 
                required 
            />
        </div>

        <div className={styles.default}>
            <label><span>* </span>Avatar URL </label>
            <input 
                id='avatar' 
                type='text' 
                onChange={handleInput} 
                placeholder='avatar' 
                value={state.avatar} 
                required 
            />
        </div>
    
        <div className={styles.default}>
            <label><span>* </span>Bio <strong>(maximum 750 characters)</strong></label>
            <textarea 
                id='bio' 
                type='text' 
                onChange={handleInput} 
                placeholder='type a short bio' 
                value={state.bio} 
                required 
                maxLength='500' 
            ></textarea>
        </div>

        {userType === 'trainer' ? <div className={styles.trainer}><label><span>* </span>Hourly rate £ </label>
        <input 
            id='rate' 
            type='number' 
            onChange={handleInput} 
            placeholder=' hourly rate' 
            value={state.rate} 
            required min='0' 
            max='150' 
            step='0.5' 
        /></div> : null}

        {userType === 'trainer' ? <div className={styles.trainer}><label><span>* </span>Region </label>
        <select id="region" value={state.region} onChange={handleInput}>
            <option value="" disabled>Select your region</option>
            <option>London</option>
            <option>South West</option>
            <option>South East</option>
            <option>East of England</option>
            <option>East Midlands</option>
            <option>West Midlands</option>
            <option>Yorkshire & Humber</option>
            <option>North West</option>
            <option>North East</option>
        </select></div> : null}

        {userType === 'trainer' ? <div className={styles.trainer}><label><span>* </span>Base town/city </label>
        <input 
            id='base' 
            type='text' 
            onChange={handleInput} 
            placeholder=' London, Sheffield.. etc' 
            value={state.base} 
            required 
        /></div> : null}

        {userType === 'trainer' ? <div className={styles.trainer}><label><span>* </span>Radius Covered <strong>(miles)</strong></label>
        <input 
            id='radius' 
            type='number' 
            onChange={handleInput} 
            placeholder='15' 
            value={state.radius} 
            min='1' 
            max='100'
        /></div> : null}

        {userType === 'trainer' ? <div className={styles.trainer}><label>Location notes <strong>(maximum 250 characters)</strong></label>
        <textarea 
            id='notes' 
            type='text' 
            onChange={handleInput} 
            value={state.notes} 
            maxLength='250' 
        ></textarea></div> : null}

        {!updatePending ? <input className='submit' type='submit' value='Submit'/> : 
        <Loading text='Processing'/>}
    </form>
);

ProfileForm.propTypes = {
    userType: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired,
    handleSubmission: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    updatePending: PropTypes.bool
}

export default ProfileForm;