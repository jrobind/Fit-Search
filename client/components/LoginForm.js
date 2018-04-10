import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';
import styles from '../styles/components/loginForm.css';

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
        const { 
                requestSuccess,
                interestSuccess,
                userType, 
                loggedIn, 
                userProfile,
                loggingIn
              } = this.props;
        
        if (requestSuccess && loggedIn && userProfile) {
            if (userType === 'trainer') {
                return interestSuccess ? <Redirect to='/' /> : <Loading text='Just a minute'/>;
            }
            return <Redirect to='/' />;
        } else {
            return(
                <div className={styles.loginContainer}>
                    <h1>Login</h1>
                    <form className={styles.form} onSubmit={this.handleSubmission}>

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

                        {!loggingIn ? <input className={styles.submit} type='submit'/> : <Loading text='logging in...'/> }
                    </form>
                </div>
            )      
        }
    }
}

LoginForm.propTypes = {
    handleLoginSubmission: PropTypes.func.isRequired,
    interestSuccess: PropTypes.bool.isRequired,
    requestSuccess: PropTypes.bool.isRequired, 
    userType: PropTypes.string,
    loggedIn: PropTypes.bool,
    userProfile: PropTypes.object,
    loggingIn: PropTypes.bool.isRequired
}

export default LoginForm;