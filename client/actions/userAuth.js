import { apiLoginUser } from '../utils/api';
import { apiLogoutUser } from '../utils/api';
import { handleGetUserProfile, resetUserProfile } from './userProfile';
import { resetSelectedTrainer } from './selectedTrainer';
import { resetSearchResults } from './searchQuery';
import { handleGetInterestRequests, resetInterestRequests } from './interestRequests';


export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const AUTH_REQUEST_PENDING = 'AUTH_REQUEST_PENDING';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const USER_LOADED = 'USER_LOADED';

export const authRequestPending = () => (
    {
        type: AUTH_REQUEST_PENDING
    }
)

export const loginFailed = () => (
    {
        type: LOGIN_FAILED
    }
)

export const userLoaded = () => (
    {
        type: USER_LOADED
    }
)

const loginUser = (userType, id) => (
    {
        type: LOGIN_USER,
        userType,
        id,
    }
)

const logoutUser = () => (
    {
        type: LOGOUT_USER
    }
)

export const handleLoginUser = (userData) => {
    return (dispatch) => {
        return apiLoginUser(userData)
            .then(({ data }) => {
                if (data) {
                    dispatch(authRequestPending());
                    dispatch(loginUser(data.userType, data.id));
                    
                    // if trainer, then we need interest requests
                    if (data.userType === 'trainer') {
                        dispatch(handleGetInterestRequests(data.id));
                        dispatch(handleGetUserProfile(data.id))
                            .then(() => (dispatch(userLoaded())));
                    } else {
                        dispatch(handleGetUserProfile(data.id))
                            .then(() => (dispatch(userLoaded())));
                    }
                } else {
                    dispatch(loginFailed());
                    return 'failed';
                }
            });
    }
}

export const handleLogoutUser = () => {
    return (dispatch) => {
        return apiLogoutUser()
            .then(({ data }) => {
                if (data) {
                    dispatch(authRequestPending());
                    dispatch(logoutUser());
                    dispatch(resetUserProfile());
                    dispatch(resetSelectedTrainer());
                    dispatch(resetSearchResults());
                    dispatch(resetInterestRequests());   
                }
            })
            .catch((error) => console.log(error))
    }
}
