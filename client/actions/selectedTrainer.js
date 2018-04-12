import { apiGetProfile } from '../utils/api';

export const GET_SELECTED_TRAINER = 'GET_SELECTED_TRAINER';
export const RESET_SELECTED_TRAINER = 'RESET_SELECTED_TRAINER';


const getSelectedTrainer = (profile) => (
    {
        type: GET_SELECTED_TRAINER,
        profile
    }
);

export const resetSelectedTrainer = () => (
    {
        type: RESET_SELECTED_TRAINER
    }
);

export const handleGetSelectedTrainer = (id) => {
    return (dispatch) => {
       return apiGetProfile(id)
            .then(({ data }) => {
           
                // format review date
                data.reviews.forEach((review, index) => {
                    review.dateCreated = new Date(review.dateCreated).toLocaleDateString('en-GB');
                });
                
                dispatch(getSelectedTrainer(data));
                return data;
            })
            .catch((error) => console.log(error))
    }
};