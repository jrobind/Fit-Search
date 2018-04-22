import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetSearchQuery } from '../actions/searchQuery';
import formatPagination from '../utils/formatPagination';
import Search from '../components/Search';

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noResults: false,
            resultsPending: false,
            currentQuery: '',
            currentPage: 1,
            numberPerPage: 6
        }
        
        this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
        this.handleResetSearch = this.handleResetSearch.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleNumberPerPage = this.handleNumberPerPage.bind(this);
    }
    
    handleNumberPerPage(width) {
        // set the number of results per page depending on deivce
        if (width > 1300) {
            this.setState(({numberPerPage: 15}));
        } else if (width > 900 && width < 1300) {
            this.setState(({numberPerPage: 10}));
        }
    }
    
    componentDidMount() { 
        const { getSearchQuery } = this.props;
        
        this.handleNumberPerPage(window.innerWidth);
        
        // toggle pending for loading feedback
        this.setState(() => ({resultsPending: true}));
        // by default grab all trainers for now
        getSearchQuery('trainer')
            .then(() => this.setState(() => ({resultsPending: false})));
    }
    
    handleResetSearch() {
        const { getSearchQuery } = this.props;
        
        this.setState(() => ({currentQuery: '', resultsPending: true, noResults: false}));
        
        getSearchQuery('trainer')
            .then(() => this.setState(() => ({resultsPending: false})));
    }
    
    handlePageClick(e) {
        const page = e.target.id;
        this.setState(() => ({currentPage: Number(page)}));
    }
    
    handleUpdateSearch(searchQuery, reset) {
        // reset page number after search query
        this.setState(() => ({currentPage: 1}));
        
        reset ? this.handleResetSearch() : null;

        if (searchQuery) {
            this.setState((prevState) => {
                const val = !prevState.currentQuery ? '' : '&'; 
                
                return {
                    currentQuery: prevState.currentQuery + val + searchQuery,
                    resultsPending: true
                }
            }, () => {
                const { getSearchQuery } = this.props;
                const { currentQuery } = this.state;
                // after new query string has been set to state above we can now get the results
                getSearchQuery(currentQuery)
                    .then((data) => {
                        !data.length ? this.setState(() => ({noResults: true, resultsPending: false})) : 
                        this.setState(() => ({noResults: false, resultsPending: false}));
                    })
                    .catch((error) => console.log(error));
            });   
        }
    }
    
    render() {
        const { currentPage, numberPerPage } = this.state;
        const { searchResults } = this.props;
        const { pageNumbers, currentResults } = formatPagination({currentPage, numberPerPage, searchResults});
        
        return <Search 
                {...this.props} 
                handleUpdateSearch={this.handleUpdateSearch}   
                handlePageClick={this.handlePageClick}
                componentState={this.state}
                currentResults={currentResults}
                pageNumbers={pageNumbers}
            />;   
    }
}

const mapStateToProps = (state) => {
    const { searchResults } = state; 

    return {
        searchResults   
    }
};

const mapDispatchToProps = (dispatch) => ({
    getSearchQuery(query) {
        return dispatch(handleGetSearchQuery(query));   
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);