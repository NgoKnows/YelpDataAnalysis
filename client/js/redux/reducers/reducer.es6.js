import { SET_REVIEWS, SET_SELECTED, SET_TEXT, SET_TIPS, SET_TYPE,
    SET_CORRECT, SET_CORRECT_COUNT } from '../constants/constants'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutablejs'
import { routeReducer } from 'redux-simple-router'

// Data
// --------------------------------------------------
let dataState = Immutable.Map({
    reviews: Immutable.List(),
    tips: Immutable.List()
});

function data(state = dataState, action) {
    switch(action.type) {
        case SET_REVIEWS:
            return state.set('reviews', Immutable.List(action.reviews));

        case SET_TIPS:
            return state.set('tips', Immutable.List(action.tips));

        default:
            return state;
    }
}

let gameState = Immutable.Map({
    text: '',
    selected: parseInt(Math.random() * (100)),
    type: Math.round((Math.random() * (1))) === 0 ? 'reviews' : 'tips',
    correct: 2,
    count: Immutable.Map({incorrect: 0, correct: 0})
})

function game(state = gameState, action) {
    switch(action.type) {
        case SET_TEXT:
            return state.set('text', action.text);

        case SET_SELECTED:
            return state.set('selected', action.index);

        case SET_TYPE:
            return state.set('type', action.textType)

        case SET_CORRECT:
            return state.set('correct', action.correct)

        case SET_CORRECT_COUNT:
            return state.set('count', Immutable.Map(action.count))

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    data,
    game,
    routing: routeReducer
});

export default rootReducer;
