import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading  from '../components/Loading';
import LoginForm from '../components/LoginForm';
import { handleLoginUser } from '../actions/userAuth';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggingIn: false
        }

        this.handleLoginSubmission = this.handleLoginSubmission.bind(this);
    }
    
    handleLoginSubmission(userData) {
        const { loginUser } = this.props;
        
        this.setState(() => ({loggingIn: true}));
        
        loginUser(userData)
            .then((result) => {
                if (result === 'failed') {
                    this.setState(() => ({loggingIn: false}));
                    alert('incorrect login details');  
                } 
            });
    }
    
    render() {
        const { loggingIn } = this.state;
    
        return <LoginForm 
                    {...this.props} 
                    handleLoginSubmission={this.handleLoginSubmission} 
                    loggingIn={loggingIn} 
                />; 
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