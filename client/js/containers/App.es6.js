import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from 'flux/actions/actions'
import TransitionGroup from 'components/RouteCSSTransitionGroup'

import 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { VelocityTransitionGroup, velocityHelpers } from 'velocity-react'

var Animations = {
    // Register these with UI Pack so that we can use stagger later.
    In: velocityHelpers.registerEffect({
        calls: [
            [{
                transformPerspective: [ 800, 800 ],
                transformOriginX: [ '50%', '50%' ],
                transformOriginY: [ '100%', '100%' ],
                marginBottom: 0,
                opacity: 1,
                rotateX: [0, 130],
            }, 1, {
                easing: 'ease-out',
                display: 'block',
            }]
        ],
    }),

    Out: velocityHelpers.registerEffect({
        calls: [
            [{
                transformPerspective: [ 800, 800 ],
                transformOriginX: [ '50%', '50%' ],
                transformOriginY: [ '0%', '0%' ],
                marginBottom: -30,
                opacity: 0,
                rotateX: -70,
            }, 1, {
                easing: 'ease-out',
                display: 'block',
            }]
        ],
    }),
};

var enterAnimation = {
    animation: Animations.In,
    stagger: 800,
    duration: 600,
    backwards: true,
    display: 'block',
    style: {
        // Since we're staggering, we want to keep the display at "none" until Velocity runs
        // the display attribute at the start of the animation.
        display: 'none',
    },
};

var leaveAnimation = {
    animation: Animations.Out,
    stagger: 0,
    duration: 400,
    backwards: true,
};

@Radium
class App extends Component {
    render() {
        const { dispatch, routing, actions } = this.props;

        const boundActions = bindActionCreators(actions, dispatch);

        let backArrow;
        if (routing.path !== '/') {
            backArrow =
                <div style={STYLES.arrowContainer} onClick={() => actions.updatePath('/')}>
                    <i style={STYLES.arrow} className="fa fa-angle-left" />
                </div>
        }
        return (
            <div>
                {backArrow}
                <div style={STYLES.container}>
                    <VelocityTransitionGroup
                        component="div"
                        enter={enterAnimation}
                        leave={leaveAnimation}>
                        {React.cloneElement(this.props.children, {key: routing.path})}
                    </VelocityTransitionGroup>
                </div>
            </div>
        )
    }
}

App.propTypes = {};

function mapStateToProps(state) {
    return {
        routing : state.get('routing')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(actions, dispatch)
    };
};

const STYLES = {
    container: {
        padding: '7rem',
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
