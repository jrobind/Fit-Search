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
        this.props.dispatch(handleLogoutUser())
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

export default withRouter(connect(mapStateToProps)(NavContainer));