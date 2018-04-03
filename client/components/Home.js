import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { userAuth } = this.props.state;
        const loggedIn = !userAuth ? false : userAuth.loggedIn;
        return(
            <div className="home-container">
                <h1>Fit-Search</h1>
                <p>The Hassle Free Personal Trainer Search</p>
                {!loggedIn ? <p>YOU ARE NOT LOGGED IN</p> : <p>YOU ARE LOGGED IN!!</p>}
            </div>
        )
    }
}

export default connect((state) => ({state}))(Home);