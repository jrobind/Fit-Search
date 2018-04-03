import { createStore } from 'redux';
import reducer from '../reducers';
import middleware from '../middleware';

const initialState = {
    userAuth: JSON.parse(localStorage.getItem('userAuth')),
};

export const initApp = () => {
    const store = createStore(reducer, initialState, middleware);

    store.subscribe (() => {
        const { userAuth } = store.getState();

        localStorage.setItem('userAuth', JSON.stringify(userAuth));
    });
    
    return store;
};