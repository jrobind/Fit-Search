const formatQueryReturn = (result) => {
    return result.map((trainer) => ({ 
        _id: trainer._id,
        profile: trainer.profile,
        reviewAverage: calculateReviewAverage(trainer.reviews)
    }));  
};

const calculateReviewAverage = (reviews) => {
    return Math.round(reviews.reduce((accumulator, currentVal) => accumulator + currentVal.rating, 0) / reviews.length);
};

module.exports = {
    formatQueryReturn,
    calculateReviewAverage
}