import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        };
    }
    
    componentDidMount() {
        const { text, speed } = this.props;
        const stopper = text + '...';
        // use setInterval to dynamically append period to loading text
        this.interval = setInterval(() => {
            if (this.state.text === stopper) {
               this.setState(() => ({text})); 
            } else {
                this.setState((prevState) => ({text: prevState.text + '.' }));
            }
        }, speed);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        const { text } = this.state;
        const { color } = this.props;
        
        return (
            <p style={{textAlign: 'center', flexBasis: '100%', fontSize: '35px', color}}>
                {text}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}

Loading.defaultProps = {
    text: 'loading',
    speed: 300,
    color: 'black'
}

export default Loading;