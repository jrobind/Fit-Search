import { 
    GET_USER_PROFILE, 
    RESET_USER_PROFILE, 
    REQUEST_PENDING, 
    REQUEST_SUCCESS 
} from '../actions/userProfile';

const initialState = {
    profile: null,
    reviews: null,
    reviewAverage: null,
    requestPending: false,
    requestSuccess: false
}

const userProfile = (state = initialState, action) => {
    switch(action.type) {
        case REQUEST_PENDING : 
            return {
                ...state,
                requestPending: true
            }
        case GET_USER_PROFILE :
            return {
                ...state,
                profile: action.profile,
                reviews: action.reviews,
                reviewAverage: action.reviewAverage
            }
        case REQUEST_SUCCESS :
            return {
                ...state,
                requestPending: false,
                requestSuccess: true
            }
        case RESET_USER_PROFILE :
            return {
                ...state,
                profile: null,
                reviews: null,
                reviewAverage: null,
                requestPending: false,
                requestSuccess: false
            }
        default :
            return state;
    }
}

export default userProfile;