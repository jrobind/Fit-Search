import { apiGetProfile } from '../utils/api';

export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const RESET_USER_PROFILE = 'RESET_USER_PROFILE';

const getUserProfile = (profile, reviews) => (
    {
        type: GET_USER_PROFILE,
        profile,
        reviews
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
                dispatch(getUserProfile(data.profile, data.reviews))
                return data;
            })
            .catch((error) => console.log(error))
    }
};