import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import Loading from '../components/Loading';
import { handleLoginUser } from '../actions/userAuth';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        
        this.handleLoginSubmission = this.handleLoginSubmission.bind(this);
    }
    
    handleLoginSubmission(userData) {
        this.props.dispatch(handleLoginUser(userData))
            .then(() => {
                this.props.history.push('/')
            });
    }
    
    render() {
        const { requestPending } = this.props;
        
        if (requestPending) {
            return <Loading />;  
        }
        
        return <LoginForm {...this.props} handleLoginSubmission={this.handleLoginSubmission}/>;   
    }
}

const mapStateToProps = (state) => ({
    requestPending: state.userAuth.requestPending,   
})

export default withRouter(connect(mapStateToProps)(LoginContainer));