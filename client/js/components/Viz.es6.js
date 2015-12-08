import React, { Component, PropTypes } from 'react';
import Radium from 'radium'

import Button from 'components/Button'

import { connect } from 'react-redux'

import { VictoryScatter, VictoryChart, VictoryAxis } from 'victory'

import moment from 'moment'

import { bindActionCreators } from 'redux'

import * as actions from 'flux/actions/actions'

@Radium
class Results extends Component {

    render() {
        const { topReviews, topTips, tipDate, reviewDate, vizType, actions } = this.props;

        let data = this.getDataUpToDate();
        let date = moment(reviewDate.toJS());

        let domain = this.getDomain(data)
        return (
            <div>
                <h1 onClick={() => actions.changeReviewDate()}>Tips vs Reviews</h1>
                    <h2>{date.format('MMMM YYYY')}</h2>
                <VictoryChart
                    height={500}
                    width={800}>
                    <VictoryAxis
                        animate={{delay: 0.5, velocity: 0.1}}
                        label="Reviews"
                    />
                    <VictoryAxis dependentAxis
                         animate={{delay: 0.5, velocity: 0.1}}
                        label="Tips"
                    />
                <VictoryScatter
                        domain={{x: [0, domain.maxX], y: [0, domain.maxY]}}
                        style={STYLES.viz}
                        animate={{delay: 0.5, velocity: 0.1}}
                        data={data}/>
                </VictoryChart>
            </div>
        );
    }

    getDomain(data) {
        let maxX = data.reduce((prev, cur) => Math.max(cur.x, prev), 0)
        let maxY = data.reduce((prev, cur) => Math.max(cur.y, prev), 0)
        if(maxX < 100) {
            maxX = 100;
        } else if (maxX < 1000) {
            maxX = 1000
        } else {
            maxX = 4000
        }

        if(maxY < 100) {
            maxY = 100;
        } else if (maxY < 1000) {
            maxY = 1000
        } else {
            maxY = 1500
        }

        return {maxX, maxY};
    }

    getDataUpToDate() {
        const { topReviews, topTips, tipDate, reviewDate, vizType, actions } = this.props;

        let date = moment(reviewDate.toJS());
        //let data = [{x: tipTotalToDate, y: reviewTotalToDate}]

        //total up tips and reviews up to date
        let data = topReviews.map((business) => {
            let i = 0;
            let j = 0;
            let reviews = business.get('reviews')
            let tips = business.get('tips')

            while(date.isAfter(reviews.getIn([i, 'date']))) {
                i++;
            }

            while(date.isAfter(tips.getIn([j, 'date']))) {
                j++
            }

            return {x: i, y: j, label: business.get('name')}


        })
        return data.toJS();
    }
}

const STYLES = {
    viz: {
        data: {
            opacity: '.70'
        },

        labels: {
            fontSize: '1.25rem',
            fontFamily: 'lato',
        }
    },
    chart: {
        tickLabels: {fontSize: 10, padding: 5}
    },
    container : {

    }
}

function mapStateToProps(state) {
    return {
        topReviews: state.getIn(['viz', 'topReviews']),
        topTips: state.getIn(['viz', 'topTips']),
        tipDate: state.getIn(['viz', 'tipDate']),
        reviewDate: state.getIn(['viz', 'reviewDate']),
        vizType: state.getIn(['viz', 'vizType']),
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(actions, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Results)
