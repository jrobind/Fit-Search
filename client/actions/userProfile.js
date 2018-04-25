import { apiGetProfile } from '../utils/api';

export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const RESET_USER_PROFILE = 'RESET_USER_PROFILE';
export const PROFILE_REQUEST_PENDING = 'PROFILE_REQUEST_PENDING';

export const profileRequestPending = () => (
    {
        type: PROFILE_REQUEST_PENDING
    }
);

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
                dispatch(profileRequestPending());
                // if no profile is returned then the user is new
                !data.profile ? dispatch(getUserProfile('new user', data.reviews, data.reviewAverage)) : dispatch(getUserProfile(data.profile, data.reviews, data.reviewAverage));
                return data;
            })
            .catch((error) => console.log(error));
    }
};