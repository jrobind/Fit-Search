import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/reviewForm.css';

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: '',
            body: ''
        }
        
        this.handleSubmission = this.handleSubmission.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    componentDidMount() {
        this.initialState = this.state;
    }
    
    
    handleSubmission(e) {
        e.preventDefault();
        this.setState(this.initialState);
        
        const reviewData = this.state;
        this.props.submitReview(reviewData);
    }
    
    handleInput(e) {
        const id = e.target.id;
        const val = e.target.value;
        
        this.setState(() => ({
            [id]: val
        }))
    }
    
    render() {
        return(
            <div className={styles.reviewContainer}>
                <h3>Leaving trainer reviews encourages accountability - tell us about your exprerience below.</h3>
                <form className={styles.form} onSubmit={this.handleSubmission}>
                    <label><span>* </span>Rating</label>
                    <input id='rating' type='number' onChange={this.handleInput} placeholder='rating between 1/5' min='1' max='5' required value={this.state.rating}/>

                    <label><span>* </span>Review message <strong>(maximum 750 characters)</strong></label>
                    <textarea id='body' type='text' onChange={this.handleInput} placeholder=' type a review' value={this.state.body} required maxLength='750'></textarea>

                    <input className={styles.submit} type='submit' value='Submit review!'/>
                </form>
            </div>
        )   
    }
}

ReviewForm.propTypes = {
    submitReview: PropTypes.func.isRequired
}


export default ReviewForm;