import React from 'react';

const handleReviewStars = (rating) => {
    switch(rating) {
        case 1 :
            return <img src={require('../images/ratings-1.png')} />
        case 2 :
            return <img src={require('../images/ratings-2.png')} />
        case 3 : 
            return <img src={require('../images/ratings-3.png')} />
        case 4 : 
            return <img src={require('../images/ratings-4.png')} />
        case 5 :
            return <img src={require('../images/ratings-5.png')} />
    }
}

export default handleReviewStars;