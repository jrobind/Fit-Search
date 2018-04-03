import axios from 'axios';

export const apiUpdateProfile = (id, data) => {
    return axios.put('/api/profile', {id, data})
        .then((data) => console.log(data))
        .catch((error) => console.log(error)); 
};

export const apiGetProfile = (id) => {
    return axios.get(`/api/profile/find/${id}`)
        .then((data) => data)
        .catch((error) => console.log(error)); 
};

export const apiRegisterUser = (data) => {
    return axios.post('/api/register', data)
        .then((data) => data)
        .catch((error) => console.log(error));
};

export const apiCreateReview = (trainerId, review) => {
    const reviewData = {
        trainerId,
        reviewData: review 
    }
    return axios.post('/api/review', reviewData)
        .then((data) => data)
        .catch((error) => console.log(error));
};   

export const apiLoginUser = (data) => {
    return axios.post('/api/login', data)
        .then((data) => data)
        .catch((error) => console.log(error));
};

export const apiLogoutUser = () => {
    return axios.get('/api/logout')
        .then((data) => data)
        .catch((error) => console.log(error));
};

export const apiGetSeachQuery = (query) => {
    return axios.get(`/api/profile/trainers/${query}`)
        .then((data) => data)
        .catch((error) => console.log(error));
};

export const apiCreateInterestRequest = (data) => {
    return axios.post('/api/interest', data)
        .then((data) => data)
        .catch((error) => console.log(error));
};

export const apiGetInterestRequests = (id) => {
    return axios.get(`/api/interest/${id}`)
        .then((data) => data)
        .catch((error) => console.log(error));
};


