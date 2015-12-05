import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from 'flux/actions/actions'
import Sample from 'components/Sample'

@Radium
class App extends Component {
    render() {
        const { dispatch, ...other } = this.props;

        const boundActions = bindActionCreators(actions, dispatch);

        return (
            <div>
                <div style={STYLES.arrowContainer}>
                    <i style={STYLES.arrow} className="fa fa-angle-left" />
                </div>
                <div style={STYLES.container}>
                    <h1 style={STYLES.title}>yelp data analysis</h1>
                    <div>
                        <div key="background" style={STYLES.item}>background.</div>
                    </div>
                    <div>
                        <div key="methods" style={STYLES.item}>methods.</div>
                    </div>
                    <div>
                        <div key="tipreview" style={STYLES.item}>tip or review?</div>
                    </div>
                </div>
            </div>
        )
    }
}

App.propTypes = {};

function mapStateToProps(state) {
    return {
        blah : state.get('blah')
    };
}

const STYLES = {
    container: {
        padding: '7rem',
    },
    title: {
        letterSpacing: '7px',
        fontSize: '2.25rem',
        color: '#c41200'
    },
    item: {
        fontSize: '2rem',
        display: 'inline-block',
        padding: '0 2rem',
        ':hover': {
            opacity: '0.5',
            cursor: 'pointer'
        }
    },
    arrow: {
        fontSize: '3.5rem',
    },
    arrowContainer: {
        position: 'fixed',
        margin: '2rem',
        padding: '0 1rem',
        ':hover': {
            opacity: '0.5',
            cursor: 'pointer'
        }
    }
}

export default connect(mapStateToProps)(App);
