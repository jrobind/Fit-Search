import React, { Component } from 'react';
import { connect } from 'react-redux';
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

export default connect(mapStateToProps)(NavContainer);