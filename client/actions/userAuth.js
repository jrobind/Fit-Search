import { apiLoginUser } from '../utils/api';
import { apiLogoutUser } from '../utils/api';
import { handleGetUserProfile, resetUserProfile } from './userProfile';
import { resetSelectedTrainer } from './selectedTrainer';
import { resetSearchResults } from './searchQuery';
import { handleGetInterestRequests, resetInterestRequests } from './interestRequests';


export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REQUEST_PENDING = 'REQUEST_PENDING';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const requestPending = () => (
    {
        type: REQUEST_PENDING
    }
)

export const requestSuccces = () => (
    {
        type: REQUEST_SUCCESS
    }
)

export const loginFailed = () => (
    {
        type: LOGIN_FAILED
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
                    dispatch(requestPending());
                    dispatch(loginUser(data.userType, data.id));
                    dispatch(handleGetUserProfile(data.id));
                    // if trainer, then we need interest requests
                    data.userType === 'trainer' ? dispatch(handleGetInterestRequests(data.id)) : null;
                    dispatch(requestSuccces());
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
                    dispatch(requestPending());
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
