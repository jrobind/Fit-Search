import { apiGetSeachQuery } from '../utils/api';

export const RESET_SEARCH_RESULTS = 'RESET_SEARCH_RESULTS';
export const GET_SEARCH_QUERY = 'GET_SEARCH_QUERY';


export const resetSearchResults = () => (
    {
        type: RESET_SEARCH_RESULTS
    }
);


const getSearchQuery = (profiles) => (
    {
        type: GET_SEARCH_QUERY,
        profiles
    }
);


export const handleGetSearchQuery = (query) => {
    return (dispatch) => {
       return apiGetSeachQuery(query)
            .then(({ data }) => {
                dispatch(resetSearchResults());
                dispatch(getSearchQuery(data));
                return data;
            })
            .catch((error) => console.log(error))
    }
}
