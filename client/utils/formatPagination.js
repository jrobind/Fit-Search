const formatPagination = ({ numberPerPage, currentPage, searchResults, reviews }) => {
    const results = reviews || searchResults;
    
    const lastResultIndex = currentPage * numberPerPage;
    const firstResultIndex = lastResultIndex - numberPerPage;
    const currentResults = results.slice(firstResultIndex, lastResultIndex);
    
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