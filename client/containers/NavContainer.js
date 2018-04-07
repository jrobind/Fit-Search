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
    const { loggedIn } = state.userAuth;
    const { userAuth, interestRequests, userProfile } = state;
    const { requestSuccess: interestRequestSuccess } = state.interestRequests;
    
    return {
        loggedIn,
        userAuth,
        interestRequests,
        interestRequestSuccess,
        userProfile
    }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser() {
        return dispatch(handleLogoutUser());   
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavContainer));