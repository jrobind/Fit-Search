import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/interest.css';

const Interest = ({  
    trainerId, 
    handleRemoveInterest,
    handlePageClick,
    pageData: { pageNumbers, currentResults },
    currentPage,
    deletePending
}) => (
    <div className={styles.interestContainer}>
        <section className={styles.background}>
            {!currentResults.length ? <div className={styles.noRequests}>You do not have any requests at the moment.</div> :
                <div className={styles.interestWrapper}>  
                    {currentResults.map(({ requestee, _id }) => (
                        <div key={_id} className={styles.card}>

                            <div className={styles.imgContainer}>
                                <img className={styles.avatar} src={requestee.profile.avatar}/>
                            </div>

                            <div className={styles.info}>
                                <div>
                                    <span className={styles.email}>User email: </span>{requestee.email}
                                </div> 
                                <div>
                                    <span className={styles.username}>Username: </span>{requestee.profile.name}
                                </div> 
                            </div>

                            <button className={styles.button} onClick={() => {
                                handleRemoveInterest(_id);
                            }}>{deletePending ? 'Deleting...' : 'Delete request'}</button>

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
        </section> 
        
        <section className={styles.explain}>
            <h1>Growing your client base made easy.</h1>
            <p className={styles.sendEmail}>
                <i className="fas fa-envelope"></i> Contact your interested clients by their email address. Clients may feel nervous or wary about personal training, so be sure to send a friendly message.
            </p>
            <p className={styles.thumb}>
                <i className="fas fa-thumbs-up"></i> After initial contact, make sure to book your client in for a free, introductory taster session. This is your chance to begin building a strong trainer/client relationship.
            </p>
        </section>
    </div>
)

Interest.propTypes = {
    pageData: PropTypes.object,
    currentPage: PropTypes.number,
    trainerId: PropTypes.string.isRequired,
    handlePageClick: PropTypes.func.isRequired,
    handleRemoveInterest: PropTypes.func.isRequired,
    deletePending: PropTypes.bool.isRequired
}

export default Interest;