import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleLogoutUser } from '../actions/userAuth';
import Nav from '../components/Nav';

class NavContainer extends Component {
    constructor(props) {
        super(props);
        
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogout() {
        const { logoutUser } = this.props;
        
        logoutUser()
            .then(() => this.props.history.push('/'));
    }
    
    render() {
        return <Nav 
                    {...this.props} 
                    handleLogout={this.handleLogout}
                />;
    }
}

const mapStateToProps = (state) => {
    const { loggedIn, userLoaded } = state.userAuth;
    const { userAuth, userProfile, interestRequests } = state;

    return {
        loggedIn,
        userAuth,
        userLoaded,
        userProfile,
        interestRequests
    }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser() {
        return dispatch(handleLogoutUser());   
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavContainer));