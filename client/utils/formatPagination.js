const formatPagination = ({ numberPerPage, currentPage, searchResults, reviews, requests }) => {
    const results = reviews || searchResults || requests;
    
    const lastResultIndex = currentPage * numberPerPage;
    const firstResultIndex = lastResultIndex - numberPerPage;
    // return array of results relevant to each page
    const currentResults = results.slice(firstResultIndex, lastResultIndex);
    
    // create array containing total page numbers that we can map over 
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(results.length / numberPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return {
        pageNumbers,
        currentResults
    }
}

export default formatPagination;