import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/components/home.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { profile, loggedIn } = this.props;
        const name = !profile ? 'Welcome - please setup your profile' : `Welcome ${profile.name}`;

        return(
                <div className="home-container">
                    <div className="hero">
                        {!loggedIn && !profile ? null : <p className="welcome-message">{name}</p>}
                        <div className="title-container">
                            <h1>FIND YOUR FITNESS GURU</h1>
                            <p>The hassle-free personal trainer search</p>
                        </div>
                        <div className="scroll-container">
                            <div className="scroll-circle">&#8595;</div>
                        </div>
                    </div>
            
                    <section className="process">
                        <h1>Finding your perfect personal trainer couldn't be easier.</h1>
                        <p className="process-explained">
                            Search our huge selection of user verified personal trainers from across England. Simply sign up and create your own unique user profile, then use our sofisticated search functionality to find the perfect personal trainer for you. Once you find a trainer you like, register your interest. 
                        </p>
                        <p className="process-explained">
                            Trainers will contact you by email to organise a <strong>FREE</strong> taster session. All thats left, is for you to get in the best shape of your life. 
                        </p>
                        <Link className="home-sign-up" to='/sign-up'>Sign me up now!</Link>

                    </section>
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