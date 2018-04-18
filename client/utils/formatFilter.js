export default (currentQuery) => {
    // seperate the query string into an array of queries
    const formatedQuery = currentQuery || currentQuery.includes('&') ? currentQuery.split('&') : currentQuery;
    
    if (!formatedQuery) {
        return ['All Trainers'];
    } else {
        // format search queries for SearchBar component filter section
        return formatedQuery.reduce((accumulator, currentVal) => {
            if (Number(currentVal)) {
               return accumulator += `Average review: ${currentVal},`;
            } else if (currentVal.match(/<|-|>/g)) {
                return accumulator += `Hourly rate: £${currentVal},`;
            } else  {
                return accumulator += `Location: ${currentVal},`; 
                return accumulator;
            }
        }, '').split(',').filter(Boolean);
    }
}
