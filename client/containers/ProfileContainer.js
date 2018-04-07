import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
        const { id, getUserProfile } = this.props;
        
        if (state !== undefined && state.profileUpdated === true) {
            getUserProfile(id);
        }
    }
    
    handleCreateProfile(id, data) {
        apiUpdateProfile(id, data)
            .then(() => {
                this.props.dispatch(handleGetUserProfile(id))
            });
    }
    
    render() {
        const { profile, requestPending, requestSuccess } = this.props;
        const { state: locationState } = this.props.location;

        if (profile && requestSuccess) {
            return <Profile profile={profile} locationState={locationState} />
        } else if (!profile) {
            return <CreateProfile {...this.props} createProfile={this.handleCreateProfile} />
        } else if (requestPending) {
            return <Loading />
        }
    }
}

const mapStateToProps = (state) => {
    const { userType, id } = state.userAuth;
    const { profile, requestSuccess, requestPending } = state.userProfile;
    
    return {
        profile,
        userType,
        id,
        requestSuccess,
        requestPending
    } 
};

const mapDispatchToProps = (dispatch) => ({
    getUserProfile(id) {
        return dispatch(handleGetUserProfile(id));   
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer));