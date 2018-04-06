import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ProfileForm = ({ 
    userType, 
    handleInput, 
    handleSubmission,
    state
}) => (
    <form className="portal-container" onSubmit={handleSubmission}>
        <label>Full name</label>
        <input id='name' type='text' onChange={handleInput} placeholder=' fullname' value={state.name}/>
    
        <label>Avatar</label>
        <input id='avatar' type='text' onChange={handleInput} placeholder='avatar' value={state.avatar}/>

        <label>Bio</label>
        <textarea id='bio' type='text' onChange={handleInput} placeholder=' type a short bio' value={state.bio}></textarea>

        {userType === 'trainer' ? <div><label>Hourly rate</label>
        <input id='rate' type='number' onChange={handleInput} placeholder=' hourly rate' value={state.rate}/></div> : null}

        {userType === 'trainer' ? <div><label>Region</label>
        <select id="region" value={state.region} onChange={handleInput}>
            <option value="" disabled>Select your region</option>
            <option>London</option>
            <option>South West</option>
            <option>South East</option>
            <option>East of England</option>
            <option>East Midlands</option>
            <option>West Midlands</option>
            <option>Yorkshire and the Humber</option>
            <option>North West</option>
            <option>North East</option>
        </select></div> : null}

        {userType === 'trainer' ? <div><label>Base town/city</label>
        <input id='base' type='text' onChange={handleInput} placeholder=' Romford, Sheffield.. etc' value={state.base}/></div> : null}

        {userType === 'trainer' ? <div><label>Radius Covered (miles)</label>
        <input id='radius' type='number' onChange={handleInput} placeholder='15' value={state.radius}/></div> : null}

        {userType === 'trainer' ? <div><label>Location notes</label>
        <textarea id='notes' type='text' onChange={handleInput} value={state.notes}></textarea></div> : null}

        <input className="submit" type='submit'/>
    </form>
);

ProfileForm.propTypes = {
    userType: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired,
    handleSubmission: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired
}

export default ProfileForm;