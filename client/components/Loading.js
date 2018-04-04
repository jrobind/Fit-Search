import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
}

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
        
        this.interval = setInterval(() => {
            if (this.state.text === stopper) {
               this.setState(() => ({text})); 
            } else {
                this.setState((prevState) => ({text: prevState.text + '.' }));
            }
        }, speed)
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        const { text } = this.state;
        const { content } = styles;
        return (
            <p style={content}>
                {text}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: 'loading',
    speed: 300
}

module.exports = Loading;