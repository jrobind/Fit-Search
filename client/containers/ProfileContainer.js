import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiUpdateProfile } from '../utils/api';
import { handleGetUserProfile } from '../actions/userProfile';
import CreateProfile from '../components/CreateProfile';
import Profile from '../components/Profile';
import Loading from '../components/Loading';

class ProfileContainer extends Component {
    constructor(props) {
        super(props);
        
        this.handleCreateProfile = this.handleCreateProfile.bind(this);
    }
    
    componentDidMount() {
        const { state } = this.props.location;
        const { id } = this.props;
        if (state !== undefined && state.profileUpdated === true) {
            this.props.dispatch(handleGetUserProfile(id))
        }
    }
    
    handleCreateProfile(id, data) {
        apiUpdateProfile(id, data)
            .then(() => {
                this.props.dispatch(handleGetUserProfile(id))
            });
    }
    
    render() {
        const { profile } = this.props;

        if (profile) {
            return <Profile profile={profile} />
        } else if (!profile) {
            return <CreateProfile {...this.props} createProfile={this.handleCreateProfile} />
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = (state) => {
    const { userType, id } = state.userAuth;
    const { profile } = state.userProfile;
    
    return {
        profile,
        userType,
        id
    } 
};

export default connect(mapStateToProps)(ProfileContainer);