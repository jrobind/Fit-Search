import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiRemoveInterestRequest } from '../utils/api';
import { handleGetInterestRequests } from '../actions/interestRequests';
import Interest from '../components/Interest';

class InterestContainer extends Component {
    constructor(props) {
        super(props);
        
        this.handleRemoveInterest = this.handleRemoveInterest.bind(this);
    }
    
    handleRemoveInterest(requestId) {
        const { getInterestRequests, trainerId } = this.props;
        
        apiRemoveInterestRequest(requestId)
            .then((data) => getInterestRequests(trainerId))
            .catch((error) => console.log(error));
    }
    
    render() {
        return <Interest {...this.props} handleRemoveInterest={this.handleRemoveInterest} />;
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