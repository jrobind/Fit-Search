import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ClientNav = ({ 
    userAuth, 
    handleLogout, 
    requestSuccess
}) => (
    <ul className="navbar">
        <li><Link to='/'>Fit Finder</Link></li>

        {userAuth.loggedIn && requestSuccess && <li><Link to='/portal'>Profile Portal</Link></li>}

        {requestSuccess && <li><Link to='/search'>Search</Link></li>}

        {!userAuth.loggedIn ? <li><Link to='/sign-up'>Sign up!</Link></li> : null}

        {!userAuth.loggedIn ? <li><Link to='/login'>login</Link></li> : <li><a onClick={() => {
            handleLogout();
        }}>logout</a></li>}
    </ul>
);

ClientNav.propTypes = {
    userAuth: PropTypes.object.isRequired,
    requestSuccess: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired
}

export default ClientNav;