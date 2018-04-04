import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Profile = ({ profile: { avatar, bio, name, rate, region, base, radius, notes }}) => (
    <div className="portal-container">
        <ul>
            <li className="profile-title">{name}</li>
            <li><img src={avatar}/></li>
            <li className="justify">{bio}</li>
            {rate ? <li>Hourly rate: £{rate}</li> : null}
            {region ? <li className="justify bold-me">Region: {region}</li> : null}
            {base ? <li className="justify bold-me">Based out of: {base}</li> : null}
            {radius ? <li className="justify bold-me">Radius Covered: {radius}</li> : null}
            {notes ? <li className="justify bold-me">areas covered notes: {notes}</li> : null}
        </ul>
        <Link className="update" to='/portal/update'>Update profile</Link>
    </div>
)

Profile.propTypes = {
    profile: PropTypes.object.isRequired 
}

export default Profile;
