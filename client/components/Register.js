import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { apiRegisterUser } from '../utils/api';


class SignUp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            checked: ''
        }
        
        this.handleSubmission = this.handleSubmission.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
    }
    
    componentDidMount() {
        this.initialState = this.state;
    }
    
    handleSubmission(e) {
        e.preventDefault();
        e.target.reset();
        
        const userData  = this.state;
        
        apiRegisterUser(userData)
            .then(({ data }) => {
                if (data && data !== 'duplicate') {
                    alert('thanks for signing up! You should recieve a confirmation email soon')
                    this.props.history.push('/login'); 
                } else {
                    alert('email address already taken!')
                }
            })
            .catch((error) => alert('Error!'))
        
        this.setState(this.initialState);
    }
    
    handleRadio(val) {
        this.setState(() => ({
            checked: val
        }))
    }
    
    handleInput(e) {
        const id = e.target.id;
        const val = e.target.value;
        
        this.setState(() => ({
            [id]: val
        }))
    }
    
    render() {
        return(
            <div className="signup-container">
                <h1>Signup</h1>
                <form className="signup-form" onSubmit={this.handleSubmission}>

                    <label htmlFor="email">Email</label>
                    <input 
                        id='email' 
                        type='email' 
                        name="email" 
                        onChange={this.handleInput} 
                        value={this.state.email} 
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        id='password' 
                        type='password' 
                        name="password" 
                        onChange={this.handleInput} 
                        value={this.state.password} 
                    />
            
                    <p>Who are you?</p>
            
                    <label className="radio-label" 
                        htmlFor="trainer"
                    >
                        <input 
                            type="radio" 
                            id="trainer" 
                            onChange={() => this.handleRadio('trainer')} 
                            checked={this.state.checked === 'trainer'} 
                            name="radAnswer"
                        /> 
                        Trainer
                    </label>
            
                    <label className="radio-label" 
                        htmlFor="client"
                    >
                        <input 
                            type="radio" 
                            id="client" 
                            onChange={() => this.handleRadio('client')} 
                            checked={this.state.checked === 'client'} 
                            name="radAnswer"
                        /> 
                        Client
                    </label>
            
                    <input className="submit" type='submit'/>
                </form>
                <hr/>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        )   
    }
}

export default withRouter(SignUp);