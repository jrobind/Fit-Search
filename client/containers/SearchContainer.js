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
        if (width > 1300) {
            this.setState(({numberPerPage: 15}));
        } else if (width > 900 && width < 1300) {
            this.setState(({numberPerPage: 10}));
        }
    }
    
    componentDidMount() { 
        const { getSearchQuery } = this.props;
        this.handleNumberPerPage(window.innerWidth);
        
        getSearchQuery('trainer');
    }
    
    handleResetSearch() {
        const { getSearchQuery } = this.props;
        
        this.setState(() => ({currentQuery: ''}));
        getSearchQuery('trainer');
    }
    
    handlePageClick(e) {
        const page = e.target.id;
        this.setState(() => ({currentPage: Number(page)}));
    }
    
    handleUpdateSearch(searchQuery, reset) {
        // reset page number
        this.setState(() => ({currentPage: 1}));
        
        reset ? this.handleResetSearch() : null;

        if (searchQuery) {
            this.setState((prevState) => {
                const val = !prevState.currentQuery ? '' : '&'; 

                return {
                    currentQuery: prevState.currentQuery + val + searchQuery
                }
            }, () => {
                const { getSearchQuery } = this.props;
                const { currentQuery } = this.state;
                
                getSearchQuery(currentQuery)
                    .then((data) => {
                        !data.length ? this.setState(() => ({noResults: true})) : this.setState(() => ({noResults: false}));
                    })
                    .catch((error) => console.log(error));
            });   
        }
    }
    
    render() {
        const { currentPage, numberPerPage} = this.state;
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