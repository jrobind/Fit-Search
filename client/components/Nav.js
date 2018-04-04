import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Nav = ({ userAuth, interestRequests, userProfile, handleLogout }) => (   
    <ul className="navbar">
        <li><Link to='/'>Fit Finder</Link></li>

        {userAuth.loggedIn && <li><Link to='/portal'>Profile Portal</Link></li>}

        {userAuth.userType === 'client' && userProfile.profile !== undefined && <li><Link to='/search'>Search</Link></li>}

        {userAuth.userType === 'trainer' && interestRequests.requests && <li><Link to='/interest'>Interest Requests<span className="request-notifications">{interestRequests.requests.length}</span></Link></li>}

        {!userAuth.loggedIn ? <li><Link to='/sign-up'>Sign up!</Link></li> : null}

        {!userAuth.loggedIn ? <li><Link to='/login'>login</Link></li> : <li><a onClick={() => {
            handleLogout();
        }}>logout</a></li>}
    </ul>
);

Nav.propTypes = {
    userAuth: PropTypes.object.isRequired,
    interestRequests: PropTypes.object.isRequired,
    userProfile: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired
}

export default Nav;