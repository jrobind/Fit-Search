import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { handleLoginUser } from '../actions/userAuth';

class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.handleLoginSubmission = this.handleLoginSubmission.bind(this);
    }
    
    handleLoginSubmission(userData) {
        const { loginUser } = this.props;
        
        loginUser(userData)
            .catch((error) => console.log(error));
    }
    
    render() {
        return <LoginForm {...this.props} handleLoginSubmission={this.handleLoginSubmission} />;   
    }
}

const mapStateToProps = (state) => {
    const { requestSuccess, userType, loggedIn } = state.userAuth;
    const { userProfile } = state;
    const { requestSuccess: interestSuccess } = state.interestRequests;

    return {
        requestSuccess,
        interestSuccess,
        userType,
        loggedIn,
        userProfile
    }   
};

const mapDispatchToProps = (dispatch) => ({
    loginUser(userData) {
        return dispatch(handleLoginUser(userData));   
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));