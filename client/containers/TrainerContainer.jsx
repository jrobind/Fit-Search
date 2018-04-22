import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleGetSelectedTrainer, resetSelectedTrainer } from '../actions/selectedTrainer';
import { apiCreateInterestRequest, apiGetInterestRequests } from '../utils/api';
import Trainer from '../components/Trainer';
import Loading from '../components/Loading';

class TrainerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: null,
            interestRegistered: false
        }
    
        this.handleInterestSubmission = this.handleInterestSubmission.bind(this);
        this.setupGeocode = this.setupGeocode.bind(this);
    }
    
    componentDidMount() {
        let { trainerId } = this.props.location.state || this.props.history.location.state;
        const { userId, getSelectedTrainer, resetSelectedTrainer } = this.props;

        resetSelectedTrainer();

        getSelectedTrainer(trainerId)
            .then(({ profile }) => {
                this.setupGeocode(profile);
                // check whether user has registered interest with trainer or not
                apiGetInterestRequests(trainerId)
                    .then(({ data }) => {
                        if (data.filter(({ requestee }) => requestee._id === userId).length) {
                            this.setState(() => ({interestRegistered: true}));
                        }
                    })
                    .catch((error) => console.log(error));
            });
    }
    
    setupGeocode({ base }) {
        const geocoder = !window.google ? null : new google.maps.Geocoder();
        // use google map api to establish trainer town/city coordinates
        geocoder.geocode({'address': base + ' UK'}, (results, status) => {
            if (status === 'OK') {
                this.setState(() => ({
                    coordinates: {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    }
                }));
            }
        });
    }
    
    handleInterestSubmission() {
        const { userId, trainerId } = this.props;
        // toggle interestRegistered so we can disble the button to prevent submission again
        apiCreateInterestRequest({requesteeId: userId, trainerId})
            .then(({data}) => data ? this.setState(() => ({interestRegistered: true})) : null)
            .catch((error) => console.log(error));
    }
    
    render() {
        const { reviews } = this.props;

        if (!reviews) {
            return <Loading />
        } else {
            return <Trainer 
                        handleInterestSubmission={this.handleInterestSubmission}
                        componentState={this.state}
                        {...this.props}
                    />   
        }
    }
}

const mapStateToProps = (state) => {
    const { profile, reviews, id: trainerId, reviewAverage } = state.selectedTrainer;
    const { id: userId,  } = state.userAuth;
    
    return {
            profile,
            reviews,
            userId,
            trainerId,
            reviewAverage,
            state
           }
};

const mapDispatchToProps = (dispatch) => ({
    getSelectedTrainer(trainerId) {
        return dispatch(handleGetSelectedTrainer(trainerId));   
    },
    resetSelectedTrainer() {
        return dispatch(resetSelectedTrainer());
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrainerContainer));