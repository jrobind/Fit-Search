import React, { Component } from 'react';
import '../styles/app.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavContainer from '../containers/NavContainer';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Search from './Search';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import Trainer from './Trainer';
import Interest from './Interest';

class App extends Component {
    render() {
        const { userAuth, interestRequests, loggedIn } = this.props; 
        console.log(this.props)
        return(
            <Router>
                <div>
                    <NavContainer />
            
                    <Route exact path='/' component={Home} />
                    <Route path='/sign-up'  render={() => {
                        return !loggedIn ? <Register /> : <Redirect to='/' />;
                    }} />
                    <Route path='/login' render={() => {
                        return !loggedIn ? <Login /> : <Redirect to='/' />;
                    }} />
                    <Route exact path='/portal/' component={Profile} />
                    <Route exact path='/portal/update' component={UpdateProfile} />
                    <Route exact path='/search' component={Search} />
                    <Route exact path='/interest' render={() => (
                        <Interest 
                            interestRequests={interestRequests.requests}
                        />                                      
                    )} />
                    <Route exact path='/search/review' component={Trainer} />
                </div>
            </Router>
        )
    }
    
}

const mapStateToProps = (state) => {
    const { userAuth, interestRequests } = state;
    const loggedIn = !userAuth ? false : userAuth.loggedIn;
    return {
        loggedIn,
        userAuth,
        interestRequests
    }
}

export default connect(mapStateToProps)(App);