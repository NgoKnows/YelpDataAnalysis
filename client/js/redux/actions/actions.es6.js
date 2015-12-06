import { SET_SELECTED, SET_TEXT, SET_TYPE, SET_REVIEWS, SET_TIPS, SET_CORRECT, SET_CORRECT_COUNT } from '../constants/constants.es6'
import Immutable from 'immutable'
import { updatePath as updateRouterPath } from 'redux-simple-router'
import request from 'superagent-bluebird-promise'

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
        dispatch(setSelected(parseInt(Math.random() * (100))))
        dispatch(setType(Math.round((Math.random() * (1))) === 0 ? 'reviews' : 'tips'))
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
