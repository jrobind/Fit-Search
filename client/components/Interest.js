import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { apiRemoveInterestRequest } from '../utils/api';
import { handleGetInterestRequests } from '../actions/interestRequests';

class Interest extends Component {
    constructor(props) {
        super(props);
        
        this.handleRemoveInterest = this.handleRemoveInterest.bind(this);
    }
    
    handleRemoveInterest(id) {
        apiRemoveInterestRequest(id)
            .then((data) => this.props.dispatch(handleGetInterestRequests(this.props.trainerId)))
            .catch((error) => console.log(error));
    }
    
    render() {
        const { requests } = this.props;
        return (
            <div>
                {!requests.length ? <p>No requests found...</p> :
                    <div className="interest-container">  
                        {requests.map(({ requestee, _id }) => (
                            <div key={_id} className="interest-card">
                                <div>User email: {requestee.email}</div> 
                                <div>User name: {requestee.profile.name}</div> 
                                <img src={requestee.profile.avatar}/>
                                <div>User bio: {requestee.profile.bio}</div>
                                <div>Already contacted the user?</div>
                                <button onClick={() => {
                                    this.handleRemoveInterest(_id);
                                }}>Remove request</button>
                            </div>
                        ))}
                    </div>
                }
            </div>   
        )
    }
}

Interest.propTypes = {
    requests: PropTypes.array.isRequired,
    trainerId: PropTypes.string.isRequired
}

export default Interest;