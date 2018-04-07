import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleGetUserProfile } from '../actions/userProfile';
import { apiUpdateProfile } from '../utils/api';
import Loading from './Loading';
import ProfileForm from './ProfileForm';



class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            avatar: '',
            bio: '',
            rate: '',
            region: '',
            base: '',
            radius: 0,
            notes: ''
        }
        
        this.handleSubmission = this.handleSubmission.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    componentDidMount() {
        this.initialState = this.state;
        const { id } = this.props;
        
        this.props.dispatch(handleGetUserProfile(id))
            .then(({ profile }) => {
                const { name, avatar, bio, rate, region, base, radius, notes } = profile;
                this.setState(() => ({
                    name,
                    avatar,
                    bio,
                    rate,
                    region,
                    base,
                    radius,
                    notes
                }));   
            });
    }
    
    handleSubmission(e) {
        const { id } = this.props;
        const data  = this.state;
        e.preventDefault();
        e.target.reset();
        
        apiUpdateProfile(id, data)
            .then(() => {
                this.props.history.push({
                    pathname: '/portal',
                    state: { profileUpdated: true}
                });
            })
            .catch((error) => console.log(error));
    }
    
    handleInput(e) {
        const id = e.target.id;
        const val = e.target.value;
        
        this.setState(() => ({
            [id]: val
        }));
    }
    
    render() {
        const { profile, userType } = this.props;
        const { name, avatar, bio } = this.state;
        
        if (!profile || !name && !avatar && !bio) {
            return <Loading text='Loading profile' />;
        } else {
            return(
                <div>
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
}

const mapStateToProps = (state) => {
    const { userType, id } = state.userAuth;
    const { profile } = state.userProfile;
    
    return {
        id,
        userType,
        profile
    }
}

export default withRouter(connect(mapStateToProps)(UpdateProfile));