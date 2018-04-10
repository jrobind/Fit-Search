import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import styles from '../styles/components/nav.css';

const Nav = ({ 
    loggedIn, 
    interestRequestSuccess,
    handleLogout,
    interestRequests: { requests },
    userAuth: { userType },
    userProfile
}) => (
    <nav>
        <ul className={styles.navbar}>
            <li className={styles.logo}><Link to='/'><img src={require('../images/logo.png')}/></Link></li>

            {loggedIn && userType === 'client' || loggedIn && interestRequestSuccess && userType === 'trainer' ? <li><NavLink activeClassName={styles.active} to='/portal'>Profile Portal</NavLink></li> : null}

            {loggedIn && userType === 'client' && userProfile.profile && <li><NavLink activeClassName={styles.active} to='/search'>Search</NavLink></li>}

            {interestRequestSuccess && loggedIn && <li><NavLink activeClassName={styles.active} to='/interest'>Interest Requests<span className={styles.requestNotifications}>{requests.length}</span></NavLink></li>}

            {!loggedIn ? <li><NavLink activeClassName={styles.active} to='/sign-up'>Sign up</NavLink></li> : null}

            {!loggedIn && <li><NavLink activeClassName={styles.active} to='/login'>login</NavLink></li>}
            
            {loggedIn && userType === 'client' || loggedIn && interestRequestSuccess && userType === 'trainer' ? <li><a onClick={() => {
                handleLogout();
            }}>logout</a></li> : null}
        </ul>
    </nav>
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