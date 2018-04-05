import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleLogoutUser } from '../actions/userAuth';
import GuestNav from '../components/GuestNav';

class NavContainer extends Component {
    constructor(props) {
        super(props);
        
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogout() {
        this.props.history.push('/');
        this.props.dispatch(handleLogoutUser());
    }
    
    render() {
        return <GuestNav 
                    {...this.props} 
                    handleLogout={this.handleLogout}
                />;
    }
}

const mapStateToProps = (state) => {
    const { userAuth, interestRequests } = state;
    const { requestSuccess } = state.userAuth;
    const { requestSuccess: interestRequestSuccess } = state.interestRequests;
    
    return {
        userAuth,
        interestRequests,
        requestSuccess,
        interestRequestSuccess
    }
}

export default withRouter(connect(mapStateToProps)(NavContainer));