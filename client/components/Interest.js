import React, { Component } from 'react';

class Interest extends Component {
    render() {
        const { interestRequests } = this.props;
        return(
            <div>
                {!interestRequests.length ? <p>No requests found...</p> :
                    <div className="interest-container">  
                        {interestRequests.map(({ requestee, _id }) => (
                            <div key={_id} className="interest-card">
                                <div>User email: {requestee.email}</div> 
                                <div>User name: {requestee.profile.name}</div> 
                                <img src={requestee.profile.avatar}/>
                                <div>User bio: {requestee.profile.bio}</div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

export default Interest;