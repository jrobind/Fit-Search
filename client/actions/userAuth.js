import { apiLoginUser } from '../utils/api';
import { apiLogoutUser } from '../utils/api';
import { handleGetUserProfile, resetUserProfile } from './userProfile';
import { resetSelectedTrainer } from './selectedTrainer';
import { resetSearchResults } from './searchQuery';
import { handleGetInterestRequests, resetInterestRequests } from './interestRequests';


export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REQUEST_PENDING = 'REQUEST_PENDING';

export const requestPending = () => (
    {
        type: REQUEST_PENDING
    }
);

const loginUser = (userType, id) => (
    {
        type: LOGIN_USER,
        userType,
        id,
    }
);

const logoutUser = () => (
    {
        type: LOGOUT_USER
    }
);


export const handleLoginUser = (userData) => {
    return (dispatch) => {
        return apiLoginUser(userData)
            .then(({ data }) => {
                if (data) {
                    dispatch(requestPending());
                    dispatch(loginUser(data.userType, data.id));
                    dispatch(handleGetUserProfile(data.id));
                    data.userType === 'trainer' ? dispatch(handleGetInterestRequests(data.id)) : null;   
                }
            })
            .catch((error) => alert('incorrect details, please try again'));
    }
};


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
};
