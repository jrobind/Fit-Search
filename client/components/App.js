import React, { Component } from 'react';
import '../styles/app.css';
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

class App extends Component {
    render() {
        const { 
            userAuth, 
            userAuth: { userType }, 
            interestRequests, 
            loggedIn, 
            userProfile 
        } = this.props; 
        console.log(this.props);
        
        return(
            <Router>
                <div>
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
    const { userAuth, interestRequests, userProfile, searchResults, selectedTrainer } = state;
    const loggedIn = !userAuth ? false : userAuth.loggedIn;

    return {
        loggedIn,
        userAuth,
        interestRequests,
        userProfile,
        searchResults,
        selectedTrainer,
        userProfile
    }
}

export default connect(mapStateToProps)(App);