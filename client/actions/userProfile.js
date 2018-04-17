import { apiGetProfile } from '../utils/api';

export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const RESET_USER_PROFILE = 'RESET_USER_PROFILE';
export const REQUEST_PENDING = 'REQUEST_PENDING';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

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

const getUserProfile = (profile, reviews, reviewAverage) => (
    {
        type: GET_USER_PROFILE,
        profile,
        reviews,
        reviewAverage
    }
);

export const resetUserProfile = () => (
    {
        type: RESET_USER_PROFILE
    }
);

export const handleGetUserProfile = (id) => {
    return (dispatch) => {
       return apiGetProfile(id)
            .then(({ data }) => {
                dispatch(requestPending());
                !data.profile ? dispatch(getUserProfile('new user', data.reviews, data.reviewAverage)) : dispatch(getUserProfile(data.profile, data.reviews, data.reviewAverage));
                dispatch(requestSuccces());
                return data;
            })
            .catch((error) => console.log(error));
    }
};