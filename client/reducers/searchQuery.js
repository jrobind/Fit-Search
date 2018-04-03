import { GET_SEARCH_QUERY, RESET_SEARCH_RESULTS } from '../actions/searchQuery';

const searchQuery = (state = [], action) => {
    switch(action.type) {
        case GET_SEARCH_QUERY : 
            return state.concat(action.profiles);
        case RESET_SEARCH_RESULTS :
            return [];
        default :
            return state;
    }
}

export default searchQuery;