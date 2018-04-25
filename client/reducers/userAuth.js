import { 
    LOGIN_USER, 
    LOGOUT_USER,
    AUTH_REQUEST_PENDING, 
    LOGIN_FAILED
} from '../actions/userAuth';

const initialState = {
    loggedIn: false,
    userType: null,
    id: null,
    requestPending: false,
    requestSuccess: false
}

const userAuth = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_REQUEST_PENDING :
            return {
                ...state,
                requestPending: !state.requestPending
            }
        case LOGIN_USER :
            return {
                ...state,
                loggedIn: !state.loggedIn,
                requestPending: !state.requestPending,
                requestSuccess: !state.requestSuccess,
                userType: action.userType,
                id: action.id,
            }
        case LOGIN_FAILED :
            return {
                loggedIn: false,
                userType: null,
                id: null,
                requestSuccess: false,
                requestPending: false
            }
        case LOGOUT_USER :
            return {
                loggedIn: false,
                userType: null,
                id: null,
                requestSuccess: false,
                requestPending: false
            }
        default :
            return state;
    }
}

export default userAuth;