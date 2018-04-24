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
        this.state = {
            updatePending: false
        }
        
        this.handleCreateProfile = this.handleCreateProfile.bind(this);
    }
    
    componentDidMount() {
        const { state } = this.props.location;
        const { id, getUserProfile } = this.props;
        
        // if updated, make sure we retrieve latest profile
        if (state !== undefined && state.profileUpdated === true) {
            this.setState(() => ({updatePending: true}));
            getUserProfile(id)
                .then(() => this.setState(() => ({updatePending: false})));
        }
    }
    
    handleCreateProfile(id, data) {
        const { getUserProfile } = this.props;
        // toggle pending to provide feedback
        this.setState(() => ({updatePending: true}));
        
        apiUpdateProfile(id, data)
            .then(() => {
                getUserProfile(id)
                    .then(() => {
                        this.setState(() => ({updatePending: false}));
                    })
            });
    }
    
    render() {
        const { profile } = this.props;
        const { updatePending } = this.state;
        const { state: locationState } = this.props.location;

        if (profile !== 'new user' && !updatePending) {
            return <Profile 
                        {...this.props}
                        locationState={locationState}
                    />
        } else if (profile === 'new user') {
            return <CreateProfile 
                        {...this.props} 
                        createProfile={this.handleCreateProfile}
                        updatePending={updatePending}
                    />
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = (state) => {
    const { userType, id } = state.userAuth;
    const { profile, reviews, reviewAverage } = state.userProfile;
    
    return {
        profile,
        userType,
        id,
        reviews,
        reviewAverage
    } 
};

const mapDispatchToProps = (dispatch) => ({
    getUserProfile(id) {
        return dispatch(handleGetUserProfile(id));   
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer));