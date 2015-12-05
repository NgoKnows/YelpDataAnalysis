import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from 'flux/actions/actions'

@Radium
class Home extends Component {
    render() {
        const { actions } = this.props;

        return (
            <div>
                <h1 style={STYLES.title}>yelp data analysis</h1>
                <div>
                    <div onClick={() => actions.updatePath('/background')} key="background" style={STYLES.item}>background.</div>
                </div>
                <div>
                    <div onClick={() => actions.updatePath('/methods')} key="methods" style={STYLES.item}>methods.</div>
                </div>
                <div>
                    <div onClick={() => actions.updatePath('/tipsvsreviews')} key="tipreview" style={STYLES.item}>tip or review?</div>
                </div>
            </div>
        );
    }
}

const STYLES = {
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
    }
}

function mapStateToProps(state) {
    return {
        blah: 'hi'
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(actions, dispatch)
    };
};

Home.propTypes = {};
Home.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home)

