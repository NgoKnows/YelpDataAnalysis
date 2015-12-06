import React, { Component, PropTypes } from 'react';
import Radium from 'radium'
import { noop } from 'lodash'

@Radium
export default class Button extends Component {
    render() {
        const { disabled, handleBlur, handleClick, handleFocus, text, type } = this.props;

        return (
            <button style={[STYLES['base'], STYLES['primary']]}
                    disabled={disabled}
                    onBlur={handleBlur}
                    onClick={handleClick}
                    onFocus={handleFocus}>
                {text}
            </button>
        );
    }
}

const STYLES = {
    base : {
        border       : 'none',
        borderRadius : '5px',
        color        : 'white',
        //margin       : '5rem',
        fontSize     : '1.25rem',
        padding      : '0.5rem 0.5rem',
        fontWeight  : 200,
        ':hover' : {
            filter  : 'grayscale(20%)',
            opacity : 0.7
        }
    },

    primary : {
        backgroundColor : '#c41200'
    },

    secondary : {
        backgroundColor : 'rgba(52, 152, 219, 1.0)'
    }
};

Button.propTypes = {
    disabled    : PropTypes.bool,
    handleBlur  : PropTypes.func,
    handleClick : PropTypes.func,
    handleFocus : PropTypes.func,
    text        : PropTypes.string,
    type        : PropTypes.string
};

Button.defaultProps = {
    disabled    : false,
    handleClick : noop,
    handleFocus : noop,
    handleBlur  : noop,
    text        : 'Add to Cart',
    type        : 'primary'
};
