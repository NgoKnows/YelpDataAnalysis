import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import Button from 'components/Button'

import { connect } from 'react-redux'

import { VictoryPie } from 'victory'

import { bindActionCreators } from 'redux'

import * as actions from 'flux/actions/actions'

@Radium
class Results extends Component {
    componentWillReceiveProps(nextProps) {
        if(this.props.count !== nextProps.count) {
            this.props.actions.plsWork('')
        }
    }

    render() {
        const { count, actions, test } = this.props;

        const correctCount = count.get('correct');
        const incorrectCount = count.get('incorrect');
        const totalCount = correctCount + incorrectCount;

        let results = [{x: `correct (${Math.trunc(correctCount/totalCount * 100)}%)`, y: correctCount},
            {x: `incorrect (${Math.trunc(incorrectCount/totalCount * 100)}%)`, y: incorrectCount}]

        return (
            <div>
                <h1>Live Guessing Results</h1>
                <VictoryPie
                    animate={{velocity: 0.05, onEnd: () => actions.plsWork(5)}}
                    data={results}
                    sliceColors={['#00695C', '#c41200']}
                    style={STYLES}/>
            </div>
        );
    }
}

const STYLES = {
    data: {
        opacity: '.70'
    },

    labels: {
        fontSize: '1.25rem',
        fontFamily: 'lato',
    }
}

function mapStateToProps(state) {
    return {
        count: state.getIn(['game', 'count']),
        test: state.getIn(['game', 'test'])
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(actions, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Results)
