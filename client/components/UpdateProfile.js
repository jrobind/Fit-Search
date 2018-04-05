import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleGetUserProfile } from '../actions/userProfile';
import { apiUpdateProfile } from '../utils/api';
import Loading from './Loading';



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
            radius: '',
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
        const { name } = this.state;
        
        if (!profile || !name) {
            return <Loading text='Loading profile' />;
        } else {
            return(
                <div>
                    <form className="portal-container" onSubmit={this.handleSubmission}>
                        <label>Full name</label>
                        <input id='name' type='text' onChange={this.handleInput} placeholder=' fullname' value={this.state.name}/>

                        <label>Avatar</label>
                        <input id='avatar' type='text' onChange={this.handleInput} placeholder='avatar' value={this.state.avatar}/>

                        <label>Bio</label>
                        <textarea id='bio' type='text' onChange={this.handleInput} placeholder=' type a short bio' value={this.state.bio}></textarea>

                        {userType === 'trainer' ? <div className="hourly"><label>Hourly rate</label>
                        <input id='rate' type='number' onChange={this.handleInput} placeholder=' hourly rate' value={this.state.rate}/></div> : null}
                
                        {userType === 'trainer' ? <div><label>Region</label>
                        <select id='region' value={this.state.region} onChange={this.handleInput}>
                            <option value="" disabled>Select your region</option>
                            <option>London</option>
                            <option>South West</option>
                            <option>South East</option>
                            <option>East of England</option>
                            <option>East Midlands</option>
                            <option>West Midlands</option>
                            <option>Yorkshire and the Humber</option>
                            <option>North West</option>
                            <option>North East</option>
                        </select></div> : null}

                        {userType === 'trainer' ? <div><label>Base town/city</label>
                        <input id='base' type='text' onChange={this.handleInput} placeholder=' Romford, Sheffield.. etc' value={this.state.base}/></div> : null}

                        {userType === 'trainer' ? <div><label>Radius Covered (miles)</label>
                        <input id='radius' type='number' onChange={this.handleInput} placeholder='15' value={this.state.radius}/></div> : null}

                        {userType === 'trainer' ? <div><label>Location notes</label>
                        <textarea id='notes' type='text' onChange={this.handleInput} value={this.state.notes}></textarea></div> : null}

                        <input className="submit" type='submit' value='Submit update!'/>
                    </form>
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

export default connect(mapStateToProps)(UpdateProfile);