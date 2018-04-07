import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { profile, loggedIn } = this.props;
        
        return(
                <div className="home-container">
                    {!loggedIn && !profile ? <p className="welcome-message please">Please sign in!</p> : <p className="welcome-message welcome">Welcome {profile.name}</p>}
                    <h1>Fit-Search</h1>
                    <p>The Hassle Free Personal Trainer Search</p>
                </div>
            )   
    }
}

const mapStateToProps = (state) => {
    const { loggedIn } = state.userAuth;
    const { profile } = state.userProfile;
    
    return {
        loggedIn,
        profile
    }
} 

export default connect(mapStateToProps)(Home);