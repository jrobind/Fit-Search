import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import styles from '../styles/components/nav.css';

const Nav = ({ 
    loggedIn, 
    handleLogout,
    userLoaded,
    interestRequests: { requests },
    userAuth: { userType },
    userProfile
}) => (
    <nav>
        <ul className={styles.navbar}>
            <li className={styles.logo}><Link to='/'><img src={require('../images/logo.png')}/></Link></li>

            {loggedIn && userLoaded && <li><NavLink activeClassName={styles.active} to='/portal'>Profile Portal</NavLink></li>}

            {userLoaded && userType === 'client' && userProfile.profile !== 'new user' && <li><NavLink activeClassName={styles.active} to='/search'>Search</NavLink></li>}

            {userLoaded && userType === 'trainer' && <li><NavLink activeClassName={styles.active} to='/interest'>Interest Requests<span className={styles.requestNotifications}>{requests.length}</span></NavLink></li>}

            {!loggedIn && !userLoaded && <li><NavLink activeClassName={styles.active} to='/sign-up'>Sign up</NavLink></li>}

            {!loggedIn && !userLoaded && <li><NavLink activeClassName={styles.active} to='/login'>Login</NavLink></li>}
            
            {loggedIn && userLoaded ? <li><a onClick={() => {
                handleLogout();
            }}>Logout</a></li> : null}
        </ul>
    </nav>
);

Nav.propTypes = {
    loggedIn: PropTypes.bool,
    userLoaded: PropTypes.bool,
    interestRequests: PropTypes.object.isRequired,
    userProfile: PropTypes.object.isRequired,
    userAuth: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired
}

export default Nav;