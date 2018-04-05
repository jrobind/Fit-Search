import React, { Component } from 'react';
import '../styles/app.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavContainer from '../containers/NavContainer';
import Home from './Home';
import Register from './Register';
import LoginContainer from '../containers/LoginContainer';
import SearchContainer from '../containers/SearchContainer';
import ProfileContainer from '../containers/ProfileContainer';
import UpdateProfile from './UpdateProfile';
import TrainerContainer from '../containers/TrainerContainer';
import InterestContainer from '../containers/InterestContainer';

class App extends Component {
    render() {
        const { userAuth, userAuth: { userType }, interestRequests, loggedIn } = this.props; 
        console.log(this.props)
        return(
            <Router>
                <div>
                    <NavContainer />
            
                    <Route exact path='/' component={Home} />
                    <Route path='/sign-up' component={Register} />
                    <Route path='/login' component={LoginContainer} />
                    <Route exact path='/portal/' component={ProfileContainer} />
                    <Route exact path='/portal/update' component={UpdateProfile} />
                    <Route exact path='/search' component={SearchContainer} />
                    <Route exact path='/interest' render={() => {
                        return userType === 'trainer' ? <InterestContainer /> : <Redirect to='/' />;                                  
                    }} />
                    <Route exact path='/search/review' component={TrainerContainer} />
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
        selectedTrainer
    }
}

//                        return !loggedIn ? <Register /> : <Redirect to='/' />;

//                        return !loggedIn ? <LoginContainer /> : <Redirect to='/' />;

export default connect(mapStateToProps)(App);