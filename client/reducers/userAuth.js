import { 
    LOGIN_USER, 
    LOGOUT_USER,
    AUTH_REQUEST_PENDING, 
    LOGIN_FAILED,
    USER_LOADED
} from '../actions/userAuth';

const initialState = {
    loggedIn: false,
    userType: null,
    id: null,
    requestPending: false,
    requestSuccess: false,
    userLoaded: false
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
        case USER_LOADED :
            return {
                ...state,
                userLoaded: !state.userLoaded
            }
        case LOGIN_FAILED :
            return {
                loggedIn: false,
                userType: null,
                id: null,
                requestSuccess: false,
                requestPending: false,
                userLoaded: false
            }
        case LOGOUT_USER :
            return {
                loggedIn: false,
                userType: null,
                id: null,
                requestSuccess: false,
                requestPending: false,
                userLoaded: false
            }
        default :
            return state;
    }
}

export default userAuth;