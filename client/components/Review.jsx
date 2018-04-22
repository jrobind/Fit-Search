import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiCreateReview } from '../utils/api';
import { handleGetSelectedTrainer } from '../actions/selectedTrainer';
import handleReviewStars from '../utils/reviewStars';
import formatPagination from '../utils/formatPagination';
import ReviewForm from './ReviewForm';
import Loading from './Loading';
import styles from '../styles/components/review.css';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewPending: false,
            reviewSuccess: false,
            currentPage: 1,
            numberPerPage: 6
        }
        
        this.handleReviewSubmission = this.handleReviewSubmission.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    
    handlePageClick(e) {
        const page = e.target.id;
        this.setState(() => ({currentPage: Number(page)}));
    }
    
    handleReviewSubmission(reviewData) {
        const { userProfile: { name, avatar }, userId, trainerId, getSelectedTrainer } = this.props;
        // set reviewPending toggle so we can provide feedback
        this.setState(() => ({reviewPending: true}));
        // set review data author information before passing to api
        reviewData.authorName = name;
        reviewData.authorAvatar = avatar;
        reviewData.authorId = userId;

        apiCreateReview(trainerId, reviewData)
            .then(({ data }) => {
                if (data === 'review added') {
                    getSelectedTrainer(trainerId)
                        .then(() => (this.setState(() => ({reviewSuccess: true, reviewPending: false}))))
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.log(error));
    }
    
    render() {
        const { reviews } = this.props;
        const { currentPage, numberPerPage, reviewSuccess, reviewPending } = this.state;
        const { pageNumbers, currentResults } = formatPagination({currentPage, numberPerPage, reviews});
        
        if (reviewPending) {
            return <Loading text='Sending review' />
        }
    
        return ( 
            <div className={styles.reviewContainer}>

                <ReviewForm 
                    submitReview={this.handleReviewSubmission} 
                    reviewSuccess={reviewSuccess}
                />

                <div className={styles.reviews}>
                    {currentResults.map((review) => 
                        <div key={review._id} className={styles.reviewCard}>
                            <div className={styles.avatar}>
                                <div className={styles.avatarImgContainer}>
                                    <img src={review.authorAvatar} alt='review author avatar'/>
                                </div>
                                <span>{review.authorName}</span>
                            </div>
                            <div className={styles.reviewInfo}>
                                {handleReviewStars(review.rating)}
                                <div className={styles.date}>{review.dateCreated}</div>
                            </div>
                            <div className={styles.reviewMessage}>{review.body}</div>
                        </div> 
                    )}
                </div>
                
                <ul className="pageNumbers">
                    {pageNumbers.map((number) => (
                        <li className={currentPage === number ? 'currentPage' : 'page'}
                            id={number} 
                            key={number} 
                            onClick={this.handlePageClick}
                        >
                            {number}
                        </li>
                    ))}
                </ul>    
            </div>
        )
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
            trainerId
           }
};

const mapDispatchToProps = (dispatch) => ({
    getSelectedTrainer(trainerId) {
        return dispatch(handleGetSelectedTrainer(trainerId));   
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);