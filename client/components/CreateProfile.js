import React, { Component } from 'react';

class App extends Component {
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
        this.props.createProfile(this.props.userId, data);
    }
    
    handleInput(e) {
        const id = e.target.id;
        const val = e.target.value;
        
        this.setState(() => ({
            [id]: val
        }));
    }
    
    render() {
        return(
            <div>
                <form className="portal-container" onSubmit={this.handleSubmission}>
                    <label>Full name</label>
                    <input id='name' type='text' onChange={this.handleInput} placeholder=' fullname' value={this.state.name}/>
            
                    <label>Avatar</label>
                    <input id='avatar' type='text' onChange={this.handleInput} placeholder='avatar' value={this.state.avatar}/>
            
                    <label>Bio</label>
                    <textarea id='bio' type='text' onChange={this.handleInput} placeholder=' type a short bio' value={this.state.bio}></textarea>
            
                    {this.props.type === 'trainer' ? <div><label>Hourly rate</label>
                    <input id='rate' type='number' onChange={this.handleInput} placeholder=' hourly rate' value={this.state.rate}/></div> : null}
                
                    {this.props.type === 'trainer' ? <div><label>Region</label>
                    <select id="region" value={this.state.region} onChange={this.handleInput}>
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
    
                    {this.props.type === 'trainer' ? <div><label>Base town/city</label>
                    <input id='base' type='text' onChange={this.handleInput} placeholder=' Romford, Sheffield.. etc' value={this.state.base}/></div> : null}
                    
                    {this.props.type === 'trainer' ? <div><label>Radius Covered (miles)</label>
                    <input id='radius' type='number' onChange={this.handleInput} placeholder='15' value={this.state.radius}/></div> : null}
    
                    {this.props.type === 'trainer' ? <div><label>Location notes</label>
                    <textarea id='notes' type='text' onChange={this.handleInput} value={this.state.notes}></textarea></div> : null}
            
                    <input className="submit" type='submit'/>
                </form>
            </div>
        )
    }
    
}

export default App;