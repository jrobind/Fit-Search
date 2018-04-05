import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TrainerNav from './TrainerNav';
import ClientNav from './ClientNav';

const GuestNav = (props) => {
    if (props.userAuth.userType === 'client') {
        return <ClientNav 
                    userAuth={props.userAuth}
                    handleLogout={props.handleLogout} 
                    requestSuccess={props.requestSuccess}
                />
    } else if (props.userAuth.userType === 'trainer') {
        return <TrainerNav {...props} />
    } else {
        return (
            <ul className="navbar">
                <li><Link to='/'>Fit Finder</Link></li>
                <li><Link to='/sign-up'>Sign up!</Link></li>
                <li><Link to='/login'>login</Link></li>
            </ul>
        ) 
    }
};

GuestNav.propTypes = {
    userAuth: PropTypes.object.isRequired,
    requestSuccess: PropTypes.bool,
    interestRequestSuccess: PropTypes.bool,
    interestRequests: PropTypes.object,
    handleLogout: PropTypes.func
}

export default GuestNav;