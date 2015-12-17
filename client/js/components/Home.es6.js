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
            <div style={STYLES.container}>
                <h1 style={STYLES.title}>classifying yelp tips</h1>
                <div>
                    <div onClick={() => actions.updatePath('/background')} key="background" style={STYLES.item}>background.</div>
                </div>
                <div>
                    <div key="methods" style={STYLES.item}>
                        <a style={STYLES.link} href="analysis/YelpClassifyingTips.pdf">methods.</a>
                    </div>
                </div>
                <div>
                    <div onClick={() => actions.updatePath('/tipsvsreviews')} key="tipreview" style={STYLES.item}>tip or review?</div>
                </div>
                <div>
                    <div onClick={() => actions.updatePath('/results')} key="results" style={STYLES.item}>guessing results.</div>
                </div>
                <div>
                    <div onClick={() => actions.updatePath('/viz')} key="viz" style={STYLES.item}>tip vs review viz.</div>
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        marginTop: '5rem'
    },
    title: {
        letterSpacing: '7px',
        fontSize: '2.25rem',
        color: '#c41200'
    },
    item: {
        fontSize: '2rem',
        display: 'inline-block',
        marginBottom: '0.5rem',
        padding: '0 2rem',
        ':hover': {
            opacity: '0.5',
            cursor: 'pointer'
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
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

