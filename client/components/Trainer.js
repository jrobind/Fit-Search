import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleGetSelectedTrainer } from '../actions/selectedTrainer';
import { apiCreateReview, apiCreateInterestRequest, apiGetInterestRequests } from '../utils/api';
import ReviewForm from './ReviewForm';
import MapContainer from './MapContainer';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: null,
            reviewSent: false,
            interestRegistered: false
        }
        
        this.handleReviewSubmission = this.handleReviewSubmission.bind(this);
        this.handleInterestSubmission = this.handleInterestSubmission.bind(this);
        this.setupGeocode = this.setupGeocode.bind(this);
    }
    
    componentDidMount() {
        let { trainerId } = this.props.location.state || this.props.history.location.state;
        const { id: userId } = this.props.state.userAuth;
        // do this as promise.all below
        
        this.props.dispatch(handleGetSelectedTrainer(trainerId))
            .then(({ profile }) => {
                this.setupGeocode(profile);
            
                apiGetInterestRequests(trainerId)
                    .then(({ data }) => {
                        if (data.filter(({ requestee }) => requestee._id === userId).length) {
                            this.setState(() => ({interestRegistered: true}))
                        }
                    });
            });
    }
    
    setupGeocode(profile) {
        const geocoder = !window.google ? null :  new google.maps.Geocoder();
            
        geocoder.geocode({'address': profile.base + 'UK'}, (results, status) => {
            if (status === 'OK') {
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();

                this.setState(() => ({
                    coordinates: {
                        lat,
                        lng
                    }
                }));
            }
        });
    }
    
    handleInterestSubmission() {
        const { id } = this.props.state.userAuth;
        const { id: trainerId } = this.props.state.selectedTrainer;
        
        apiCreateInterestRequest({requesteeId: id, trainerId})
            .then(({data}) => data ? this.setState(() => ({interestRegistered: true})) : null);
    }
    
    handleReviewSubmission(reviewData) {
        this.setState(() => ({reviewSent: true}));
        const { id: trainerId } = this.props.state.selectedTrainer;
        const { id } = this.props.state.userAuth;
        const { profile } = this.props.state.userProfile;
        
        reviewData.authorName = profile.name;
        reviewData.authorAvatar = profile.avatar;
        reviewData.authorId = id;
        
        apiCreateReview(trainerId, reviewData)
            .then(({ data }) => {
                if (data.authorAvatar && data.authorName) {
                    this.props.dispatch(handleGetSelectedTrainer(trainerId))
                        .then(({ profile }) => {
                            this.setState(() => ({reviewSent: false}));
                        });   
                }
            });
    }
    
    render() {
        const { profile, reviews } = this.props.state.selectedTrainer;
        const { coordinates, reviewSent } = this.state;
        
        return(
            <div className="review-container">
                {!profile ? <p>LOADING</p> : 
                    <div className="trainer single-view">
                        <h3>Trainer Name</h3>
                        <div>{profile.name}</div>
                        <img src={profile.avatar}/>
                        <h3>Trainer Bio</h3>
                        <div>{profile.bio}</div>
                        <h3>Hourly rate</h3>
                        <div>{profile.region}</div>
                        <div>{profile.base}</div>
                        <div>{profile.notes}</div>
                        {!this.state.interestRegistered ? <button onClick={this.handleInterestSubmission} className="interest">Register interest!</button> : <button className="interest-disable" disabled >Interest registered!</button>}
            
                        {!coordinates ? <p>LOADING MAP</p> : <MapContainer base={profile.base} radius={profile.radius} coordinates={coordinates}/>}
                        
                        {reviewSent ? <p>processing review...</p> : null}
            
                        <ReviewForm submitReview={this.handleReviewSubmission} />
                        {!reviews ? null : <div className="review-list">
                            {reviews.map((review) => 
                                <div key={review._id} className="review-card">
                                    <div>{review.authorName}</div>
                                    <img src={review.authorAvatar}/>
                                    <div>{review.rating}</div>
                                    <div>{review.body}</div>
                                </div> 
                            )}
                        </div>}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
})

export default connect(mapStateToProps)(Review);