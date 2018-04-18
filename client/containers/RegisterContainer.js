import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { apiRegisterUser } from '../utils/api';
import RegisterForm from '../components/RegisterForm';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerSuccess: false,
            registerPending: false
        }
        
        this.handleRegister= this.handleRegister.bind(this);
    }
    
    handleRegister(userData) {
        // toggle registerPending so we can provide feedback
        this.setState(() => ({registerPending: true}));
        
        apiRegisterUser(userData)
            .then(({ data }) => {
                if (data && data !== 'duplicate') {
                    this.setState(() => ({registerSuccess: true, registerPending: false}));
                } else {
                    this.setState(() => ({registerSuccess: false, registerPending: false}));
                }
            })
            .catch((error) => alert('Registration error!'))
    }
    
    render() {
        const { registerSuccess, registerPending } = this.state;
        
        return <RegisterForm 
                        handleRegister={this.handleRegister} 
                        registerSuccess={registerSuccess}
                        registerPending={registerPending}
                    />;
    }
}

export default Register;