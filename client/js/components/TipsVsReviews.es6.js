import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import Button from 'components/Button'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from 'flux/actions/actions'

import reviewsJSON from '../../../analysis/reviews.json'
import tipsJSON from '../../../analysis/tips.json'

let reviews = reviewsJSON.reviews;
let tips = tipsJSON.tips;

let texts = {reviews, tips}

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
    stagger: 400,
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
class TipsVsReviews extends Component {
    componentWillMount() {
        this.props.actions.setReviews(reviews);
        this.props.actions.setTips(tips);
    }

    render() {
        const { reviews, tips, selected, type, correct, count, actions } = this.props;

        const texts = {
            reviews,
            tips
        }

        return (
            <div style={STYLES.container}>
                <h1>Review or Tip?</h1>
                <VelocityTransitionGroup
                    component="div"
                    enter={enterAnimation}
                    leave={leaveAnimation}>
                    <div id="textBox" style={[STYLES.textBox, STYLES[correct]]} key={type+selected}>
                        {texts[type].get(selected)}
                    </div>
                </VelocityTransitionGroup>
                <div style={STYLES.buttonGroup}>
                    <div style={[STYLES.button, STYLES.tipButton]}>
                        <Button handleClick={() => actions.postGuess('tips')} type="button" text="Tip"/>
                    </div>
                    <div style={STYLES.buttonTextSeparator}>
                        or
                    </div>
                    <div style={[STYLES.button, STYLES.reviewButton]}>
                        <Button handleClick={() => actions.postGuess('reviews')} type="button" text="Review"/>
                    </div>
                    <div style={STYLES.buttonTextSeparator}>
                        ?
                    </div>
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem'
    },
    button: {
        display: 'inline-block'
    },
    tipButton: {
        margin: '0.75rem 0.75rem 0.75rem 0'
    },
    reviewButton: {
        margin: '0.75rem 0.35rem 0.75rem 0.75rem'
    },
    buttonTextSeparator: {
        alignSelf: 'center',
        fontSize: '1.5rem'
    },
    textBox: {
        //height: '10rem'
    },
    0: {
        color: 'red'
    },
    1: {
        color: 'green'
    }

}
TipsVsReviews.propTypes = {};
TipsVsReviews.defaultProps = {};

function mapStateToProps(state) {
    return {
        selected: state.getIn(['game', 'selected']),
        type: state.getIn(['game', 'type']),
        correct: state.getIn(['game', 'correct']),
        reviews: state.getIn(['data', 'reviews']),
        tips: state.getIn(['data', 'tips']),
        count: state.getIn(['game', 'count'])
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TipsVsReviews)
