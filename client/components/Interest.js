import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Interest = ({ requests, trainerId, handleRemoveInterest }) => (
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
                            handleRemoveInterest(_id);
                        }}>Remove request</button>
                    </div>
                ))}
            </div>
        }
    </div>   
)

Interest.propTypes = {
    requests: PropTypes.array.isRequired,
    trainerId: PropTypes.string.isRequired,
    handleRemoveInterest: PropTypes.func.isRequired
}

export default Interest;