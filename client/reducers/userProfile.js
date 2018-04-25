import { 
    GET_USER_PROFILE, 
    RESET_USER_PROFILE, 
    PROFILE_REQUEST_PENDING
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
        case PROFILE_REQUEST_PENDING : 
            return {
                ...state,
                requestPending: !state.requestPending
            }
        case GET_USER_PROFILE :
            return {
                ...state,
                profile: action.profile,
                reviews: action.reviews,
                reviewAverage: action.reviewAverage,
                requestPending: !state.requestPending,
                requestSuccess: !state.requestSuccess
            }
        case RESET_USER_PROFILE :
            return {
                profile: null,
                reviews: null,
                reviewAverage: null,
                requestSuccess: false,
                requestPending: false
            }
        default :
            return state;
    }
}

export default userProfile;