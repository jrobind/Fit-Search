export default (currentQuery) => {
    
    const formatedQuery = currentQuery || currentQuery.includes('&') ? currentQuery.split('&') : currentQuery;
    
    if (!formatedQuery || formatedQuery[0] === null) {
        return 'All Trainers'
    } else {
        return formatedQuery.reduce((accumulator, currentVal) => {
            if (Number(currentVal)) {
               return accumulator += ' Average review: ' + currentVal;
            } else if (currentVal.match(/<|-|>/g)) {
                return accumulator += ' hourly rate: ' + currentVal;
            } else  {
                return accumulator += ' Location: ' + currentVal; 
                return accumulator;
            }
        }, '');
    }
}
