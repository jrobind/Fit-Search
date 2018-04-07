import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            checked: ''
        }
        
        this.handleInput = this.handleInput.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }
    
    componentDidMount() {
        this.initialState = this.state;
    }
    
    handleSubmission(e) {
        e.preventDefault();
        e.target.reset();
        
        const userData  = this.state;
        
        this.props.handleRegister(userData);
        this.setState(this.initialState);
    }
    
    handleRadio(val) {
        this.setState(() => ({checked: val}));
    }
    
    handleInput(e) {
        const id = e.target.id;
        const val = e.target.value;
        
        this.setState(() => ({
            [id]: val
        }));
    }
    
    render() {
        const { registerSuccess } = this.props;
        
        return(
            <div className="signup-container">
                {!registerSuccess ? null :  <div className="register-success">
                    <span>Registration successful!</span>
                    <Link to='/login'>login now</Link>
                </div>}
                <h1>Signup</h1>
                <form className="signup-form" onSubmit={this.handleSubmission}>

                    <label htmlFor="email">Email</label>
                    <input 
                        id='email' 
                        type='email' 
                        name="email" 
                        onChange={this.handleInput} 
                        value={this.state.email} 
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        id='password' 
                        type='password' 
                        name="password" 
                        onChange={this.handleInput} 
                        value={this.state.password}
                        pattern="(?=.*\d)(?=.*[a-zA-Z]).{6,}"
                        required
                    />
                    <p>Password should contain at least <strong>1 number</strong> and should be <strong>6 characters</strong> in length</p>
            
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
                            required
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
                
RegisterForm.propTypes = {
    handleRegister: PropTypes.func.isRequired,
    registerSuccess: PropTypes.bool.isRequired
}

export default RegisterForm;