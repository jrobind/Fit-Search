import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavContainer from '../containers/NavContainer';
import Home from './Home';
import RegisterContainer from '../containers/RegisterContainer';
import LoginContainer from '../containers/LoginContainer';
import SearchContainer from '../containers/SearchContainer';
import ProfileContainer from '../containers/ProfileContainer';
import UpdateProfile from './UpdateProfile';
import TrainerContainer from '../containers/TrainerContainer';
import InterestContainer from '../containers/InterestContainer';
import '../styles/app.css';

class App extends Component {
    render() {
        const { userAuth: { userType }, loggedIn, userProfile, state } = this.props; 
        console.log(state)
        return(
            <Router>
                <div className='app-container'>
                    <NavContainer />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/sign-up' component={RegisterContainer} />
                        <Route path='/login' component={LoginContainer} />

                        <Route exact path='/portal' render={() => (
                            loggedIn ? <ProfileContainer /> : <Redirect to='/' />  
                        )} />

                        <Route exact path='/portal/update' render={() => (
                            loggedIn ? <UpdateProfile /> : <Redirect to='/' />  
                        )} />

                        <Route exact path='/search' render={() => (
                            loggedIn && userType === 'client' && userProfile.profile ? <SearchContainer /> : <Redirect to='/' />
                        )} />

                        <Route exact path='/interest' render={() => (
                            loggedIn && userType === 'trainer' ? <InterestContainer /> : <Redirect to='/' />                                  
                        )} />

                        <Route exact path='/search/trainer' render={() => (
                            loggedIn && userType === 'client' ? <TrainerContainer /> : <Redirect to='/' />  
                        )} />
                        
                        <Route render={() => (<p>Path Not Found!!</p>)} />
                    </Switch> 
                </div>
            </Router>
        )
    }
    
}

const mapStateToProps = (state) => {
    const { userAuth, userProfile } = state;
    const loggedIn = !userAuth ? false : userAuth.loggedIn;

    return {
        loggedIn,
        userAuth,
        userProfile,
        state
    }
}

export default connect(mapStateToProps)(App);