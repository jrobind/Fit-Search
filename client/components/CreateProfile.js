import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        const { name, avatar, bio, rate, region, base, radius, notes } = this.state;
        
        return(
            <div className="setup-profile-container">
                <h1>Welcome to Fit-Search</h1>
                <h4>You dont have a {userType} profile setup just yet. Not to worry, fill in the form below and well get right to it.</h4>
            
                <form className="portal-container" onSubmit={this.handleSubmission}>
                    <label>Full name</label>
                    <input id='name' type='text' onChange={this.handleInput} placeholder=' fullname' value={name}/>

                    <label>Avatar</label>
                    <input id='avatar' type='text' onChange={this.handleInput} placeholder='avatar' value={avatar}/>

                    <label>Bio</label>
                    <textarea id='bio' type='text' onChange={this.handleInput} placeholder=' type a short bio' value={bio}></textarea>

                    {userType === 'trainer' ? <div><label>Hourly rate</label>
                    <input id='rate' type='number' onChange={this.handleInput} placeholder=' hourly rate' value={rate}/></div> : null}

                    {userType === 'trainer' ? <div><label>Region</label>
                    <select id="region" value={region} onChange={this.handleInput}>
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
                    <input id='base' type='text' onChange={this.handleInput} placeholder=' Romford, Sheffield.. etc' value={base}/></div> : null}

                    {userType === 'trainer' ? <div><label>Radius Covered (miles)</label>
                    <input id='radius' type='number' onChange={this.handleInput} placeholder='15' value={radius}/></div> : null}

                    {userType === 'trainer' ? <div><label>Location notes</label>
                    <textarea id='notes' type='text' onChange={this.handleInput} value={notes}></textarea></div> : null}

                    <input className="submit" type='submit'/>
                </form>
            </div>
        )
    } 
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    profile: PropTypes.object
}

export default CreateProfile;