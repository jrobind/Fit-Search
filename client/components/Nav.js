import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogoutUser } from '../actions/userAuth';

class Nav extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { userAuth, interestRequests } = this.props;
        let isLogged;
        let isLoading;
        
        if (userAuth) {
            isLogged = userAuth.loggedIn ? true : false;
        } else if (interestRequests) {
            isLoading = interestRequests.requestPending ? true : false;
        } 
        
        return(
            <ul className="navbar">
                <li><Link to='/'>Fit Finder</Link></li>
            
                {userAuth && userAuth.loggedIn && <li><Link to='/portal'>Profile Portal</Link></li>}
            
                {userAuth && userAuth.userType === 'client' && <li><Link to='/search'>Search</Link></li>}
            
                {userAuth && userAuth.userType === 'trainer' && interestRequests && interestRequests.requests && <li><Link to='/interest'>Interest Requests<span className="request-notifications">{!isLoading ? interestRequests.requests.length : null}</span></Link></li>}
            
                {!isLogged ? <li><Link to='/sign-up'>Sign up!</Link></li> : null}
                 
                {!isLogged ? <li><Link to='/login'>login</Link></li> : <li><a onClick={() => {
                    this.props.history.push('/');
                    this.props.dispatch(handleLogoutUser())
                }}>logout</a></li>}
            </ul>
        )
    }
}

const mapStateToProps = (state) => ({
    userAuth: state.userAuth,
    interestRequests: state.interestRequests
})

export default withRouter(connect(mapStateToProps)(Nav));