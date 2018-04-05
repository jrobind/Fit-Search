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
            currentQuery: ''
        }
        
        this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
        this.handleResetSearch = this.handleResetSearch.bind(this);
    }
    
    componentDidMount() {
        this.props.dispatch(handleGetSearchQuery('trainer'));
    }
    
    handleResetSearch() {
        console.log(this.state)
        this.setState(() => ({currentQuery: ''}));
        this.props.dispatch(handleGetSearchQuery('trainer'));
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
        if (reset) {
            this.handleResetSearch();
        }
        
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
        

    
    render() {
        const { noResults, currentQuery } = this.state;
        
        return <Search 
                    {...this.props} 
                    handleUpdateSearch={this.handleUpdateSearch} 
                    handleReviewStars={this.handleReviewStars} 
                    message={noResults} 
                    currentQuery={currentQuery} 
                />;
    }
}

const mapStateToProps = (state) => ({
    searchResults: state.searchResults
});

export default connect(mapStateToProps)(SearchContainer);