import React, { Component } from 'react';
import { connect } from 'react-redux';
import Interest from '../components/Interest';

const InterestContainer = (props) => <Interest {...props} />

const mapStateToProps = (state) => {
    const { requests } = state.interestRequests;
    const { id: trainerId } = state.userAuth
    
    return {
        requests,
        trainerId
    }
};

export default connect(mapStateToProps)(InterestContainer);