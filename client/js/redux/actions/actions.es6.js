import { SET_SELECTED, SET_TEXT, SET_TYPE, SET_REVIEWS, SET_TIPS,
    SET_CORRECT, SET_CORRECT_COUNT, SET_TOP_REVIEWS, SET_TOP_TIPS,
SET_VIZ_TYPE, SET_TIP_DATE, SET_REVIEW_DATE} from '../constants/constants.es6'
import Immutable from 'immutable'
import { updatePath as updateRouterPath } from 'redux-simple-router'
import request from 'superagent-bluebird-promise'
import moment from 'moment'

export function setSelected(index) {
    return {
        type: SET_SELECTED,
        index
    }
}

export function setText(text) {
    return {
        type: SET_TEXT,
        text
    }
}

export function setType(textType) {
    return {
        type: SET_TYPE,
        textType
    }
}

export function setReviews(reviews) {
    return {
        type: SET_REVIEWS,
        reviews
    }
}

export function setTips(tips) {
    return {
        type: SET_TIPS,
        tips
    }
}

export function setCorrect(correct) {
    return {
        type: SET_CORRECT,
        correct
    }
}

export function setCorrectCount(count) {
    return {
        type: SET_CORRECT_COUNT,
        count
    }
}

export function setTest(test) {
    return {
        type: 'TEST',
        test
    }
}

export function setTopReviews(reviews) {
    return {
        type: SET_TOP_REVIEWS,
        reviews
    }
}

export function setTopTips(tips) {
    return {
        type: SET_TOP_TIPS,
        tips
    }
}

export function setTipDate(date) {
    return {
        type: SET_TIP_DATE,
        date
    }
}

export function setReviewDate(date) {
    return {
        type: SET_REVIEW_DATE,
        date
    }
}

export function setVizType(vizType) {
    return {
        type: SET_VIZ_TYPE,
        vizType
    }
}

export function plsWork(blah) {
    return (dispatch, getState) => {
        console.log(blah)
        dispatch(setTest(blah))
        //if(blah !== 'test') {
        //    dispatch(setTest(blah))
        //}
    }
}

// Router
// --------------------------------------------------
export const updatePath = updateRouterPath;

export function postGuess(guess) {
    return (dispatch, getState) => {
        const correct = guess === getState().getIn(['game', 'type']);

        if (correct) {
            dispatch(setCorrect(1));
        } else {
            dispatch(setCorrect(0));
        }

        request
            .post('/api/guess')
            .send(correct)
            .then(() => setTimeout(() => {
                console.log('here')
                dispatch(setNewTip())
                dispatch(setCorrect(2))
            }, 500))
    }
}

export function setNewTip() {
    return (dispatch, getState) => {
        dispatch(setType(Math.round((Math.random() * (1))) === 0 ? 'reviews' : 'tips'))
        let type = getState().getIn(['game', 'type']);
        let textArray;
        if(type === 0){
            textArray = getState().getIn(['data', 'reviews']);
        } else {
            textArray = getState().getIn(['data', 'tips']);
        }
        dispatch(setSelected(parseInt(Math.random() * (textArray.size))))

    }
}


import reviewsJSON from '../../../../analysis/top_reviewed.json'
import tipsJSON from '../../../../analysis/top_tipped.json'
export function getVizData() {
    return (dispatch, getState) => {
        dispatch(setTopReviews(reviewsJSON.places))
        dispatch(setTopTips(tipsJSON.places))
    }
}

export function getInitialGuesses() {
    return (dispatch, getState) => {
        request
            .get('/api/guess')
            .then((data) => {
                const guesses = JSON.parse(data.text).guesses;
                let correct = guesses.reduce((prevValue, guess) => {
                    if (guess.correct === "true") {
                        prevValue.correct++
                    } else {
                        prevValue.incorrect++
                    }
                    return prevValue
                }, {correct: 0, incorrect: 0})
                dispatch(setCorrectCount(correct));
            })
    }
}

export function changeReviewDate() {
    return (dispatch, getState) => {
        let startDate = moment(getState().getIn(['viz', 'reviewDate']).toJS());

       for(let i = 0; i <= 100; i++) {
            startDate = startDate.add(1, 'month')
            let newDate = [startDate.year(), startDate.month(), 1];
            setTimeout(() => dispatch(setReviewDate(newDate)), i * 500);
        }
    }
}