import { GET_INTEREST_REQUESTS, RESET_INTEREST_REQUESTS, API_REQUEST_PENDING } from '../actions/interestRequests';

const initialState = {
    requests: null,
    requestPending: false,
    requestSuccess: false
}

const interestRequests = (state = initialState, action) => {
    switch(action.type) {
        case GET_INTEREST_REQUESTS :
            return {
                ...state,
                requests: action.requests,
                requestPending: false,
                requestSuccess: true
            }
        case API_REQUEST_PENDING :
            return {
                ...state,
                requestPending: true
            }
        case RESET_INTEREST_REQUESTS :
            return {
                ...state,
                requests: null,
                requestPending: false,
                requestSuccess: false
            }
        default :
            return state;
    }
}

export default interestRequests;