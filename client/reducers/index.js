import { combineReducers } from 'redux';
import userAuth from './userAuth';
import userProfile from './userProfile';
import searchQuery from './searchQuery';
import selectedTrainer from './selectedTrainer';
import interestRequests from './interestRequests';

export default combineReducers({
    userAuth,
    userProfile,
    selectedTrainer,
    searchResults: searchQuery,
    interestRequests
});