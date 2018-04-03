import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SearchToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            
        }
        
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }
    
    componentDidMount() {
        this.initialState = this.state;
    }
    
    handleSubmission(e) {
        e.preventDefault();
        e.target.reset();
        
        this.props.handleUpdateSearch(this.state.location);
        
        this.setState(this.initialState);
    }
    
    handleSelect(e) {
        const val = e.target.value;
        
        this.setState(() => ({
            location: val
        }));
    }
    
    render() {
        const { searchResults } = this.props.state;
        return(
            <div className="search-toggle-container">
                <h3>Show results for</h3>
                <div className="toggle-reviews">
                    <h5>Average Trainer Review</h5>
                    <a onClick={() => this.props.handleUpdateSearch('5')}><img src={require('../../images/ratings-5.png')}/></a>
                                                                                      
                    <a onClick={() => this.props.handleUpdateSearch('4')}><img src={require('../../images/ratings-4.png')}/></a>
                                                                                      
                    <a onClick={() => this.props.handleUpdateSearch('3')}><img src={require('../../images/ratings-3.png')}/></a>
                                                                                      
                    <a onClick={() => this.props.handleUpdateSearch('2')}><img src={require('../../images/ratings-2.png')}/></a>
                                                                                      
                    <a onClick={() => this.props.handleUpdateSearch('1')}><img src={require('../../images/ratings-1.png')}/></a>          
                </div>
                <div className="hourly">
                    <h5>Trainer hourly rate</h5>
                    <a onClick={() => this.props.handleUpdateSearch('<25')}>under £25</a>
                    <a onClick={() => this.props.handleUpdateSearch('25-35')}>£25-35</a>
                    <a onClick={() => this.props.handleUpdateSearch('35-45')}>£35-45</a>
                    <a onClick={() => this.props.handleUpdateSearch('45-55')}>£45-55</a>
                    <a onClick={() => this.props.handleUpdateSearch('55>')}>over £55</a>
                </div>
                <h5>Trainer location</h5>
                <form onSubmit={this.handleSubmission}>
                    <select value={this.state.location} onChange={this.handleSelect}>
                        <option value="" disabled>Select your region</option>
                        <option>London</option>
                        <option>South West</option>
                        <option>South East</option>
                        <option>East of England</option>
                        <option>East Midlands</option>
                        <option>West Midlands</option>
                        <option>Yorkshire and the Humber</option>
                        <option>North West</option>
                        <option>North East</option>
                    </select>
                    <input type="submit" value="Go" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
})

export default connect(mapStateToProps)(SearchToggle);