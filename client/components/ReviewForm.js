import React, { Component } from 'react';

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
            <div>
                <form className="review-form" onSubmit={this.handleSubmission}>
                    <label>Rating</label>
                    <input id='rating' type='number' onChange={this.handleInput} placeholder='rating between 1/5' value={this.state.rating}/>

                    <label>Review</label>
                    <textarea id='body' type='text' onChange={this.handleInput} placeholder=' type a review' value={this.state.body}></textarea>

                    <input className="submit" type='submit' value='Submit review!'/>
                </form>
            </div>
        )   
    }
}


export default ReviewForm;