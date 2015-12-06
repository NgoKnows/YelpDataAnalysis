import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import Button from 'components/Button'

import reviewsJSON from '../../../analysis/reviews.json'
import tipsJSON from '../../../analysis/tips.json'

let reviews = reviewsJSON.reviews;
let tips = tipsJSON.tips;

let texts = {reviews, tips}

@Radium
export default class TipsVsReviews extends Component {
    componentWillMount() {
        this.setState({
            selected: parseInt(Math.random() * (100)),
            type: parseInt(Math.round((Math.random() * (1)))) === 0 ? 'reviews' : 'tips'
        })
    }

    render() {
        console.log(this.state.selected);
        console.log(this.state.type);
        return (
            <div>
                <h1>Review or Tip?</h1>
                <div>
                    {texts[this.state.type][this.state.selected]}
                </div>
                <div style={STYLES.buttonGroup}>
                    <div style={[STYLES.button, STYLES.tipButton]}>
                        <Button type="button" text="Tip"/>
                    </div>
                    <div style={STYLES.buttonTextSeparator}>
                        or
                    </div>
                    <div style={[STYLES.button, STYLES.reviewButton]}>
                        <Button type="button" text="Review"/>
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
        margin: '0.75rem 0.25rem 0.75rem 0.75rem'
    },
    buttonTextSeparator: {
        alignSelf: 'center',
        fontSize: '1.5rem'
    }
}
TipsVsReviews.propTypes = {};
TipsVsReviews.defaultProps = {};
