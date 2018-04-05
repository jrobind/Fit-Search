import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TrainerNav = ({ 
    userAuth, 
    handleLogout, 
    requestSuccess,
    interestRequests,
    interestRequestSuccess 
}) => (
    <ul className="navbar">
        <li><Link to='/'>Fit Finder</Link></li>

        {userAuth.loggedIn && interestRequestSuccess && requestSuccess && <li><Link to='/portal'>Profile Portal</Link></li>}

        {interestRequestSuccess && requestSuccess && <li><Link to='/interest'>Interest Requests<span className="request-notifications">{interestRequests.requests.length}</span></Link></li>}

        {!userAuth.loggedIn ? <li><Link to='/sign-up'>Sign up!</Link></li> : null}

        {!userAuth.loggedIn ? <li><Link to='/login'>login</Link></li> : <li><a onClick={() => {
            handleLogout();
        }}>logout</a></li>}
    </ul>
);

TrainerNav.propTypes = {
    userAuth: PropTypes.object.isRequired,
    requestSuccess: PropTypes.bool.isRequired,
    interestRequestSuccess: PropTypes.bool.isRequired,
    interestRequests: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired
}

export default TrainerNav;