import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import Button from 'components/Button'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from 'flux/actions/actions'

@Radium
class Results extends Component {
    componentWillMount() {
        //this.props.actions.setReviews(reviews);
        //this.props.actions.setTips(tips);
    }

    render() {
        //const { reviews, tips, selected, type, correct, count, actions } = this.props;

        return (
            <div></div>
        );
    }
}

const STYLES = {}

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

export default connect(mapStateToProps, mapDispatchToProps)(Results)
