import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { profile, loggedIn } = this.props;
        const name = !profile ? 'Welcome - please setup your profile' : `Welcome ${profile.name}`;

        return(
                <div className="home-container">
                    {!loggedIn && !profile ? <p className="welcome-message please">Please sign in!</p> : <p className="welcome-message welcome">{name}</p>}
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