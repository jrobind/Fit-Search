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
        this.props.dispatch(handleLoginUser(userData))
            .catch((error) => console.log(error));
    }
    
    render() {
        const { requestPending, requestSuccess} = this.props;
        
        return <LoginForm 
                    {...this.props} 
                    handleLoginSubmission={this.handleLoginSubmission}
                    loading={requestPending}
                    success={requestSuccess}
                />;   
    }
}

const mapStateToProps = (state) => {
    const { requestPending, requestSuccess } = state.userAuth;

    return {
        requestPending,
        requestSuccess
    }   
}

export default withRouter(connect(mapStateToProps)(LoginContainer));