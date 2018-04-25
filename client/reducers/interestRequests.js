import { GET_INTEREST_REQUESTS, RESET_INTEREST_REQUESTS, INTEREST_REQUEST_PENDING } from '../actions/interestRequests';

const initialState = {
    requests: null,
    requestPending: false,
    requestSuccess: false
}

const interestRequests = (state = initialState, action) => {
    switch(action.type) {
        case INTEREST_REQUEST_PENDING :
            return {
                ...state,
                requestPending: !state.requestPending
            }
        case GET_INTEREST_REQUESTS :
            return {
                ...state,
                requests: action.requests,
                requestPending: !state.requestPending,
                requestSuccess: !state.requestSuccess
            }
        case RESET_INTEREST_REQUESTS :
            return {
                requests: null,
                requestSuccess: false,
                requestPending: false
            }
        default :
            return state;
    }
}

export default interestRequests;