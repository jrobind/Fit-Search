import { GET_SELECTED_TRAINER, RESET_SELECTED_TRAINER } from '../actions/selectedTrainer';

const initialState = {
    profile: null,
    id: null,
    reviews: null,
    reviewAverage: null
}

const selectedTrainer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SELECTED_TRAINER :
            const { profile } = action;
            return {
                ...state,
                profile: profile.profile,
                id: profile._id,
                reviews: profile.reviews,
                reviewAverage: profile.reviewAverage
            }
        case RESET_SELECTED_TRAINER : 
            return {
                ...state,
                profile: null,
                id: null,
                reviews: null,
                reviewAverage: null
            }        
        default :
            return state;
    }
}

export default selectedTrainer;