import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { apiRegisterUser } from '../utils/api';
import RegisterForm from '../components/RegisterForm';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerSuccess: false
        }
        
        this.handleRegister= this.handleRegister.bind(this);
    }
    
    handleRegister(userData) {
        apiRegisterUser(userData)
            .then(({ data }) => {
                if (data && data !== 'duplicate') {
                    this.setState(() => ({registerSuccess: true}));
                } else {
                    this.setState(() => ({registerSuccess: false}));
                }
            })
            .catch((error) => alert('Registration error!'))
    }
    
    render() {
        const { registerSuccess } = this.state;
        
        return <RegisterForm 
                        handleRegister={this.handleRegister} 
                        registerSuccess={registerSuccess} 
                    />;
    }
}

export default Register;