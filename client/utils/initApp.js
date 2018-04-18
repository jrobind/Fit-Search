import { createStore } from 'redux';
import reducer from '../reducers';
import middleware from '../middleware';

const initialState = {
    userAuth: !JSON.parse(localStorage.getItem('userAuth')) ? {} : JSON.parse(localStorage.getItem('userAuth')),
    userProfile: !JSON.parse(localStorage.getItem('userProfile')) ? {} : JSON.parse(localStorage.getItem('userProfile')),
    interestRequests: !JSON.parse(localStorage.getItem('interestRequests')) ? {} : JSON.parse(localStorage.getItem('interestRequests')),
    selectedTrainer: {},
    searchResults: []
};

export const initApp = () => {
    const store = createStore(reducer, initialState, middleware);
    // persist certain redux store data to local storage
    store.subscribe(() => {
        const { userAuth, userProfile, interestRequests } = store.getState();

        localStorage.setItem('userAuth', JSON.stringify(userAuth));
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        localStorage.setItem('interestRequests', JSON.stringify(interestRequests));
    });
    
    return store;
};