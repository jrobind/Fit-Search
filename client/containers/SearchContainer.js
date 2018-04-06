import React, { Component } from 'react';
import { handleGetSearchQuery } from '../actions/searchQuery';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../components/Search';

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noResults: false,
            currentQuery: '',
            currentPage: 1,
            resultsPerPage: 2
        }
        
        this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
        this.handleResetSearch = this.handleResetSearch.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    
    componentDidMount() {
        this.props.dispatch(handleGetSearchQuery('trainer'));
    }
    
    handleResetSearch() {
        this.setState(() => ({currentQuery: ''}));
        this.props.dispatch(handleGetSearchQuery('trainer'));
    }
    
    handlePageClick(e) {
        const page = e.target.id;
        this.setState(() => ({currentPage: Number(page)}));
    }
    
    handleReviewStars(rating) {
        switch(rating) {
            case 1 :
                return <img src={require('../../images/ratings-1.png')} />
            case 2 :
                return <img src={require('../../images/ratings-2.png')} />
            case 3 : 
                return <img src={require('../../images/ratings-3.png')} />
            case 4 : 
                return <img src={require('../../images/ratings-4.png')} />
            case 5 :
                return <img src={require('../../images/ratings-5.png')} />
        }
    }
    
    handleUpdateSearch(searchQuery, reset) {
        reset ? this.handleResetSearch() : null;

        if (searchQuery) {
            this.setState((prevState) => {
                const val = !prevState.currentQuery ? '' : '&'; 

                return {
                        currentQuery: prevState.currentQuery + val + searchQuery
                }
            }, () => {
                this.props.dispatch(handleGetSearchQuery(this.state.currentQuery))
                    .then((data) => {
                        !data.length ? this.setState(() => ({noResults: true})) : this.setState(() => ({noResults: false}));
                    })
                    .catch((error) => console.log(error));
            });   
        }
    }
    
    render() {
        const { currentPage, resultsPerPage} = this.state;
        const { searchResults } = this.props;
        
        const lastResultIndex = currentPage * resultsPerPage;
        const firstResultIndex = lastResultIndex - resultsPerPage;
        const currentSearchResults = searchResults.slice(firstResultIndex, lastResultIndex);

        // total number of pages    
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(searchResults.length / resultsPerPage); i++) {
            pageNumbers.push(i);
        }
        
        return <Search 
                    {...this.props} 
                    handleUpdateSearch={this.handleUpdateSearch} 
                    handleReviewStars={this.handleReviewStars}  
                    handlePageClick={this.handlePageClick}
                    componentState={this.state}
                    currentSearchResults={currentSearchResults}
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

export default connect(mapStateToProps)(SearchContainer);