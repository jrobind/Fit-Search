import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/components/nav.css';

const Nav = ({ 
    loggedIn, 
    interestRequestSuccess,
    handleLogout,
    interestRequests: { requests },
    userAuth: { userType },
    userProfile
}) => (
    <ul className="navbar">
        <li><NavLink activeClassName="active" exact to='/'>Fit Finder</NavLink></li>
    
        {loggedIn && userType === 'client' || loggedIn && interestRequestSuccess && userType === 'trainer' ? <li><NavLink activeClassName="active" to='/portal'>Profile Portal</NavLink></li> : null}
    
        {loggedIn && userType === 'client' && userProfile.profile && <li><NavLink activeClassName="active" to='/search'>Search</NavLink></li>}
    
        {interestRequestSuccess && loggedIn && <li><NavLink activeClassName="active" to='/interest'>Interest Requests<span className="request-notifications">{requests.length}</span></NavLink></li>}
    
        {!loggedIn ? <li><NavLink activeClassName="active" to='/sign-up'>Sign up!</NavLink></li> : null}
    
        {!loggedIn ? <li><NavLink activeClassName="active" to='/login'>login</NavLink></li> : <li><a onClick={() => {
            handleLogout();
        }}>logout</a></li>}
    </ul>
);

Nav.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    interestRequests: PropTypes.object.isRequired,
    interestRequestSuccess: PropTypes.bool.isRequired,
    userAuth: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired,
    userProfile: PropTypes.object.isRequired
}

export default Nav;