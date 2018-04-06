import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetSelectedTrainer } from '../actions/selectedTrainer';
import { apiCreateReview, apiCreateInterestRequest, apiGetInterestRequests } from '../utils/api';
import Trainer from '../components/Trainer';
import Loading from '../components/Loading';

class TrainerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: null,
            reviewSent: false,
            interestRegistered: false,
            currentPage: 1,
            resultsPerPage: 4,
            reviews: null
        }
        
        this.handleReviewSubmission = this.handleReviewSubmission.bind(this);
        this.handleInterestSubmission = this.handleInterestSubmission.bind(this);
        this.setupGeocode = this.setupGeocode.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    
    componentDidMount() {
        let { trainerId } = this.props.location.state || this.props.history.location.state;
        const { userId } = this.props;

        this.props.dispatch(handleGetSelectedTrainer(trainerId))
            .then(({ profile }) => {
                this.setupGeocode(profile);
            
                apiGetInterestRequests(trainerId)
                    .then(({ data }) => {
                        if (data.filter(({ requestee }) => requestee._id === userId).length) {
                            this.setState(() => ({interestRegistered: true}))
                        }
                    })
                    .catch((error) => console.log(error));
            });
    }
    
    handlePageClick(e) {
        const page = e.target.id;
        this.setState(() => ({currentPage: Number(page)}));
    }
    
    setupGeocode({ base }) {
        const geocoder = !window.google ? null : new google.maps.Geocoder();

        geocoder.geocode({'address': base + ' UK'}, (results, status) => {
            if (status === 'OK') {
                this.setState(() => ({
                    coordinates: {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    }
                }));
            }
        });
    }
    
    handleInterestSubmission() {
        const { userId, trainerId } = this.props;
        
        apiCreateInterestRequest({requesteeId: userId, trainerId})
            .then(({data}) => data ? this.setState(() => ({interestRegistered: true})) : null)
            .catch((error) => console.log(error));
    }
    
    handleReviewSubmission(reviewData) {
        const { userProfile: { name, avatar }, userId, trainerId } = this.props;
        
        this.setState(() => ({reviewSent: true}));
        
        reviewData.authorName = name;
        reviewData.authorAvatar = avatar;
        reviewData.authorId = userId;
   
        apiCreateReview(trainerId, reviewData)
            .then(({ data: { authorAvatar, authorName }}) => {
                if (authorAvatar && authorName) {
                    this.props.dispatch(handleGetSelectedTrainer(trainerId))
                        .then(() => this.setState(() => ({reviewSent: false})))
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.log(error));
    }
    
    render() {
        const { reviews } = this.props;

        if (!reviews) {
            return <Loading />
        } else {
            const { currentPage, resultsPerPage } = this.state;
            
            const lastResultIndex = currentPage * resultsPerPage;
            const firstResultIndex = lastResultIndex - resultsPerPage;
            const currentReviewResults = reviews.slice(firstResultIndex, lastResultIndex); 
            
            // total number of pages    
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(reviews.length / resultsPerPage); i++) {
                pageNumbers.push(i);
            }

            return <Trainer 
                        handleReviewSubmission={this.handleReviewSubmission}
                        handleInterestSubmission={this.handleInterestSubmission}
                        handlePageClick={this.handlePageClick}
                        componentState={this.state}
                        currentReviewResults={currentReviewResults}
                        pageNumbers={pageNumbers}
                        {...this.props}
                    />   
        }
    }
}

const mapStateToProps = (state) => {
    const { profile, reviews, id: trainerId } = state.selectedTrainer;
    const { id: userId,  } = state.userAuth;
    const { profile: userProfile } = state.userProfile;
    
    return {
            profile,
            userProfile,
            reviews,
            userId,
            trainerId,
            state
           }
};

export default connect(mapStateToProps)(TrainerContainer);