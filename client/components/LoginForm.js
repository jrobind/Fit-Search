import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        
        this.handleSubmission = this.handleSubmission.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    componentDidMount() {
        this.initialState = this.state;
    }
    
    handleSubmission(e) {
        e.preventDefault();
        this.setState(this.initialState);
        
        const userData = this.state;
        this.props.handleLoginSubmission(userData);
    }
    
    handleInput(e) {
        const id = e.target.id;
        const val = e.target.value;
        
        this.setState(() => ({
            [id]: val
        }));
    }
    
    render() {
        const { loading, success } = this.props;
        
        if (loading) {
            return <Loading text='Just a minute'/>
        } else if (success) {
            return <Redirect to='/' />
        } else {
            return(
                <div className="login-container">
                    <h1>Login</h1>
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

                        <input className="submit" type='submit'/>
                    </form>
                </div>
            )      
        }
    }
}

LoginForm.propTypes = {
    handleLoginSubmission: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

export default LoginForm;