import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleLoginUser } from '../actions/userAuth';
import { withRouter } from 'react-router-dom';

class Login extends Component {
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
        e.target.reset();
        
        const userData = this.state;
        
        this.props.dispatch(handleLoginUser(userData))
            .then(() => {
                this.props.history.push('/')
            });
        
        this.setState(this.initialState);
    }
    
    handleInput(e) {
        const id = e.target.id;
        const val = e.target.value;
        
        this.setState(() => ({
            [id]: val
        }))
    }
    
    render() {
        const { userAuth } = this.props.state;
        
        if (userAuth) {
            if (userAuth.requestPending) {
                return <p>CHECKING DETAILS</p>   
            }
        }
            
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

const mapStateToProps = (state) => ({
    state
})

export default withRouter(connect(mapStateToProps)(Login));