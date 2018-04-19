import axios from 'axios';

// prevent IE caching
const config = {
    headers: {
        Pragma: 'no-cache'
    }
}

export const apiUpdateProfile = (id, data) => {
    return axios.put('/api/profile', {id, data}, config)
        .then((data) => data)
        .catch((error) => console.log(error)); 
}

export const apiGetProfile = (id) => {
    return axios.get(`/api/profile/find/${id}`, config)
        .then((data) => data)
        .catch((error) => console.log(error)); 
}

export const apiRegisterUser = (data) => {
    return axios.post('/api/register', data, config)
        .then((data) => data)
        .catch((error) => console.log(error));
}

export const apiCreateReview = (trainerId, review) => {
    const reviewData = {
        trainerId,
        reviewData: review 
    };
    return axios.post('/api/review', reviewData, config)
        .then((data) => data)
        .catch((error) => console.log(error));
}   

export const apiLoginUser = (data) => {
    return axios.post('/api/login', data, config)
        .then((data) => data)
        .catch((error) => error);
}

export const apiLogoutUser = () => {
    return axios.get('/api/logout', config)
        .then((data) => data)
        .catch((error) => console.log(error));
}

export const apiGetSeachQuery = (query) => {
    return axios.get(`/api/profile/trainers/${query}`, config)
        .then((data) => data)
        .catch((error) => console.log(error));
}

export const apiCreateInterestRequest = (data) => {
    return axios.post('/api/interest', data, config)
        .then((data) => data)
        .catch((error) => console.log(error));
}

export const apiGetInterestRequests = (id) => {
    return axios.get(`/api/interest/${id}`, config)
        .then((data) => data)
        .catch((error) => console.log(error));
}

export const apiRemoveInterestRequest = (id) => {
    return axios.delete(`/api/interest/${id}`, config)
        .then((data) => data)
        .catch((error) => console.log(error));
}
