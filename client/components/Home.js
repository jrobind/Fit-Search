import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../styles/components/home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: undefined
        }
        
        this.handleResize = this.handleResize.bind(this);
    }
    
    handleResize() {
        this.setState(() => ({height: window.innerHeight -72})); // take into account navbar  
    }
    
    componentDidMount() {
        // setting fixed height value to hero prevents img resizing bug on scroll on some mobile browsers
        if (window.innerWidth > 450) {
            this.handleResize();
            window.addEventListener('resize', this.handleResize);   
        } else {
            this.setState(() => ({height: window.innerHeight - 72}));
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    
    render() {
        const { profile, loggedIn } = this.props;
        const { height } = this.state;
        let name;
        
        if (profile) {
            if (profile !== null) {
                name = profile === 'new user' ? 'Welcome - please setup your profile' : `Welcome ${profile.name}`;  
            }    
        }

        return(
                <div className={styles.homeContainer}>
                    <div style={{height}} className={styles.hero}>
                        <div className={styles.titleWrap}>
                            {!loggedIn && !profile ? null : <p className={styles.welcome}>{name}</p>}

                            <div className={styles.titleContainer}>
                                <h1>FIND YOUR FITNESS GURU</h1>
                                <p>The hassle-free personal trainer search</p>
                            </div>

                            <div className={styles.scrollContainer}>
                                <div className={styles.scrollCircle}>&#8595;</div>
                            </div>
                        </div>
                    </div>
            
                    <section className={styles.processContainer}>
                        <h1>Finding your perfect personal trainer couldn't be easier.</h1>
                        <p className={styles.processExplained}>
                            Search our huge selection of user verified personal trainers from across England. Simply sign up and create your own unique user profile, then use our sofisticated search functionality to find the perfect personal trainer for you. Once you find a trainer you like, register your interest. 
                        </p>
                        <p className={styles.processExplained}>
                            Trainers will contact you by email to organise a <strong>FREE</strong> taster session. All thats left, is for you to get in the best shape of your life. 
                        </p>
                        <Link className={styles.signup} to='/sign-up'>Sign me up now!</Link>
                    </section>
                    
                    <section className={styles.reviewContainer}>
                        <h1>Not convinced? See what our users have to say.</h1>
                        <div className={styles.reviewOne}>
                            <div className={styles.reviewImgContainerOne}>
                                <img src={require('../images/review-one.jpg')}/>
                            </div>
                            <p>
                                <i className="fas fa-quote-left"></i>
                                    I've been training with Josh Howell for over three months now. In one word Michael has been, AMAZING! I've lost over 10kg and put on over 3kg in muscle mass. I feel incredible, I'm able to do so much more with my life. Michael's sessions are hard work but at the same time really fun. I am so glad I found Fit-Search.
                                <i className="fas fa-quote-right"></i>
                            </p>
                        </div>
                        <div className={styles.reviewTwo}>
                            <div className={styles.reviewImgContainerTwo}>
                                <img src={require('../images/review-two.jpg')}/>
                            </div>
                            <p>
                                <i className="fas fa-quote-left"></i>
                                    I stumbled upon Fit-Search around six months ago. Within a few days I found a trainer who lived locally. The process was painless and very professional. Kelly, my trainer, contacted me after I registered my interest with her and organised my free taster session. All I can say is, I'm hooked! I've lost over 15kg and I feel fitter than ever. What a life-changing six months it's been! And its all thanks to Fit-Search and Shelly. 
                                <i className="fas fa-quote-right"></i>
                            </p>
                        </div>
                    </section>
                                          
                    <section className={styles.teaserContainer}>
                        <p className={styles.teaser}>
                            Our unqiue trainer review system encourages trainer accountablity - making it easier for you to find trainers who deliver high quality, tailor made, personal coaching services.
                        </p>
                            
                        <div className={styles.imgBlock}>                           
                            <div className={styles.teaserImgContainerOne}>
                                <img src={require('../images/teaser(1).jpg')}/>
                            </div>          
                            <div className={styles.teaserImgContainerTwo}>
                                <img src={require('../images/teaser(2).jpg')}/>
                            </div> 
                        </div>
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