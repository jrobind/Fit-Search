import { GET_USER_PROFILE, RESET_USER_PROFILE } from '../actions/userProfile';

const initialState = {
    profile: null,
    reviews: null
}

const userProfile = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_PROFILE :
            return {
                ...state,
                profile: action.profile,
                reviews: action.reviews
            }
        case RESET_USER_PROFILE :
            return {
                ...state,
                profile: null,
                reviews: null
            }
        default :
            return state;
    }
}

export default userProfile;