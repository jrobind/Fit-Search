import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileForm from './ProfileForm';

class CreateProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            avatar: '',
            bio: '',
            rate: '',
            region: '',
            base: '',
            radius: '',
            notes: '',
        }
        
        this.handleSubmission = this.handleSubmission.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    handleSubmission(e) {
        e.preventDefault();
        e.target.reset();
        
        const data  = this.state;
        this.props.createProfile(this.props.id, data);
    }
    
    handleInput(e) {
        const id = e.target.id;
        const val = e.target.value;
        
        this.setState(() => ({
            [id]: val
        }));
    }
    
    render() {
        const { userType } = this.props;
        
        return(
            <div className="setup-profile-container">
                <h1>Welcome to Fit-Search</h1>
                <h4>You dont have a {userType} profile setup just yet. Not to worry, fill in the form below and well get right to it.</h4>
                <ProfileForm 
                    handleSubmission={this.handleSubmission}
                    handleInput={this.handleInput}
                    state={this.state}
                    userType={userType}
                />
            </div>
        )
    } 
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    profile: PropTypes.object,
    requestPending: PropTypes.bool,
    requestSuccess: PropTypes.bool
}

export default CreateProfile;