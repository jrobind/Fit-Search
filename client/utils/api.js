import axios from 'axios';

export const apiRegisterUser = (data) => {
    return axios.post('/api/register', data)
        .then((data) => data)
        .catch((error) => console.log(error));
}

export const apiLoginUser = (data) => {
    return axios.post('/api/login', data)
        .then((data) => data)
        .catch((error) => console.log(error));
}

export const apiLogoutUser = () => {
    return axios.get('/api/logout')
        .then((data) => data)
        .catch((error) => console.log(error));
}