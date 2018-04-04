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
        this.props.history.push('/');
        this.props.dispatch(handleLogoutUser());
    }
    
    render() {
        return <Nav {...this.props} handleLogout={this.handleLogout} />;
    }
}

const mapStateToProps = (state) => {
    const { userAuth, interestRequests, userProfile } = state;
    return {
        userAuth,
        interestRequests,
        userProfile
    }
}

export default withRouter(connect(mapStateToProps)(NavContainer));