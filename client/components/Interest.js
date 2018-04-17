import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/interest.css';

const Interest = ({  
    trainerId, 
    handleRemoveInterest,
    handlePageClick,
    pageNumbers,
    currentResults,
    currentPage
}) => (
    <div className={styles.interestContainer}>
        <div className={styles.background}>
            {!currentResults.length ? <div className={styles.noRequests}>You do not have any requests at the moment.</div> :
                <div className={styles.interestWrapper}>  
                    {currentResults.map(({ requestee, _id }) => (
                        <div key={_id} className={styles.card}>

                            <div className={styles.imgContainer}>
                                <img className={styles.avatar} src={requestee.profile.avatar}/>
                            </div>

                            <div className={styles.info}>
                                <div><span className={styles.email}>User email: </span>{requestee.email}</div> 
                                <div><span className={styles.username}>Username: </span>{requestee.profile.name}</div> 
                            </div>

                            <button className={styles.button} onClick={() => {
                                handleRemoveInterest(_id);
                                handleDisableInterest(_id);
                            }}>Delete request</button>

                            <div className={styles.bioContainer}>
                                <h4 className={styles.bio}>User bio</h4>
                                <div>{requestee.profile.bio}</div>
                            </div>
                        </div>
                    ))}
                    <ul className="pageNumbers">
                        {pageNumbers.map((number) => (
                            <li className={currentPage === number ? 'currentPage' : 'page'}
                                id={number} 
                                key={number} 
                                onClick={handlePageClick}
                            >
                                {number}
                            </li>
                        ))}
                    </ul>  
                </div>
            }
        </div> 
        
        <div className={styles.explain}>
            <p>
                Make sure to contact your interested clients by their email address. Clients may feel nervous or wary about exercising, and for many this will be their first time with a trainer, so make sure to send a polite message that will encourage client/trainer trust!
            </p>
        </div>
    </div>
)

Interest.propTypes = {
    pageNumbers: PropTypes.array,
    currentPage: PropTypes.number,
    currentResults: PropTypes.array.isRequired,
    trainerId: PropTypes.string.isRequired,
    handlePageClick: PropTypes.func.isRequired,
    handleRemoveInterest: PropTypes.func.isRequired
}

export default Interest;