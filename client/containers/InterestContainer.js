import React, { Component } from 'react';
import { connect } from 'react-redux';
import formatPagination from '../utils/formatPagination';
import { apiRemoveInterestRequest } from '../utils/api';
import { handleGetInterestRequests } from '../actions/interestRequests';
import Interest from '../components/Interest';

class InterestContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            numberPerPage: 2,
            deletePending: false 
        }
        
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleRemoveInterest = this.handleRemoveInterest.bind(this);
    }
    
    handlePageClick(e) {
        const page = e.target.id;
        this.setState(() => ({currentPage: Number(page)}));
    }
    
    handleRemoveInterest(requestId) {
        const { getInterestRequests, trainerId } = this.props;
        // reset back to page 1 and toggle deletePending for feedback
        this.setState(() => ({currentPage: 1, deletePending: true}));
        
        apiRemoveInterestRequest(requestId)
            .then((data) => {
                this.setState(() => ({deletePending: false}));
                getInterestRequests(trainerId);
            })
            .catch((error) => console.log(error));
    }
    
    render() {
        const { currentPage, numberPerPage, deletePending } = this.state;
        const { requests } = this.props;
        const pageData = formatPagination({currentPage, numberPerPage, requests});
        
        return <Interest 
                    {...this.props}
                    deletePending={deletePending}
                    pageData={pageData}
                    handlePageClick={this.handlePageClick}
                    handleRemoveInterest={this.handleRemoveInterest} 
                />;
    }
}

const mapStateToProps = (state) => {
    const { requests } = state.interestRequests;
    const { id: trainerId } = state.userAuth
    
    return {
        requests,
        trainerId
    }
};

const mapDispatchToProps = (dispatch) => ({
    getInterestRequests(trainerId) {
        return dispatch(handleGetInterestRequests(trainerId));   
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestContainer);