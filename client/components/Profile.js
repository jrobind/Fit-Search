import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiUpdateProfile } from '../utils/api';
import { handleGetUserProfile } from '../actions/userProfile';
import CreateProfile from './CreateProfile';

class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.handleCreateProfile = this.handleCreateProfile.bind(this);
    }
    
    componentDidMount() {
        const { state } = this.props.location;
        const { id } = this.props.state.userAuth;
        if (state !== undefined && state.profileUpdated === true) {
            this.props.dispatch(handleGetUserProfile(id))
        }
    }
    
    handleCreateProfile(id, data) {
        apiUpdateProfile(id, data)
            .then((data) => {
                this.props.dispatch(handleGetUserProfile(id))
            })
    }
    
    render() {
        const { id, userType } = this.props.state.userAuth;
        const { profile } = this.props.state.userProfile;
        
        if (profile !== undefined) {
            return(
                <div className="portal-container">
                    <ul>
                        <li className="profile-title">{profile.name}</li>
                        <li><img src={profile.avatar}/></li>
                        <li className="justify">{profile.bio}</li>
                        {profile.rate ? <li>Hourly rate: £{profile.rate}</li> : null}
                        {profile.region ? <li className="justify bold-me">Region: {profile.region}</li> : null}
                        {profile.base ? <li className="justify bold-me">Based out of: {profile.base}</li> : null}
                        {profile.radius ? <li className="justify bold-me">Radius Covered: {profile.radius}</li> : null}
                        {profile.notes ? <li className="justify bold-me">areas covered notes: {profile.notes}</li> : null}
                    </ul>
                    <Link className="update" to='/portal/update'>Update profile</Link>
                </div>
            )
        } else if (profile === undefined) {
            return (
                <div className="setup-profile-container">
                    <h1>Welcome to Fit-Search</h1>
                    <h4>You dont have a {userType} profile setup just yet. Not to worry, fill in the form below and well get right to it.</h4>
                    <CreateProfile type={userType} createProfile={this.handleCreateProfile} userId={id}/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    state
})

export default connect(mapStateToProps)(Profile);