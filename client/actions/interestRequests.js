import { apiGetInterestRequests } from '../utils/api';

export const RESET_INTEREST_REQUESTS = 'RESET_INTEREST_REQUESTS';
export const GET_INTEREST_REQUESTS = 'GET_INTEREST_REQUESTS';
export const INTEREST_REQUEST_PENDING = 'INTEREST_REQUEST_PENDING';


export const resetInterestRequests = () => (
    {
        type: RESET_INTEREST_REQUESTS
    }
);

export const interestRequestPending = () => (
    {
        type: INTEREST_REQUEST_PENDING
    }
);

const getInterestRequests = (requests) => (
    {
        type: GET_INTEREST_REQUESTS,
        requests
    }
);

export const handleGetInterestRequests = (id) => {
    return (dispatch) => {
        dispatch(interestRequestPending());
        return apiGetInterestRequests(id)
            .then(({ data }) => {
                dispatch(getInterestRequests(data));
                return data;
            })
            .catch((error) => console.log(error))
    }
};
