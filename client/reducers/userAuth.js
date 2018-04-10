import { 
    LOGIN_USER, 
    LOGOUT_USER,
    REQUEST_PENDING, 
    REQUEST_SUCCESS,
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
        case REQUEST_PENDING :
            return {
                ...state,
                requestPending: true
            }
        case LOGIN_USER :
            return {
                ...state,
                loggedIn: true,
                userType: action.userType,
                id: action.id
            }
        case LOGIN_FAILED :
            return {
                ...state,
                loggedIn: false,
                requestPending: false,
                requestSuccess: false
            }
        case REQUEST_SUCCESS :
            return {
                ...state,
                requestPending: false,
                requestSuccess: true
            }
        case LOGOUT_USER :
            return {
                ...state,
                loggedIn: false,
                userType: null,
                id: null,
                requestPending: false,
                requestSuccess: false,
            }
        default :
            return state;
    }
}

export default userAuth;