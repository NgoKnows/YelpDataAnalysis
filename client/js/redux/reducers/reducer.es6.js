import { SET_REVIEWS, SET_SELECTED, SET_TEXT, SET_TIPS, SET_TYPE,
    SET_CORRECT, SET_CORRECT_COUNT, SET_TOP_REVIEWS, SET_TOP_TIPS,
    SET_VIZ_TYPE, SET_TIP_DATE, SET_REVIEW_DATE } from '../constants/constants'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutablejs'
import { routeReducer } from 'redux-simple-router'
import moment from 'moment'

// Data
// --------------------------------------------------
let dataState = Immutable.Map({
    reviews: Immutable.List(),
    tips: Immutable.List()
});

function data(state = dataState, action) {
    switch(action.type) {
        case SET_REVIEWS:
            console.log(action.reviews)
            return state.set('reviews', Immutable.List(action.reviews));

        case SET_TIPS:
            console.log(action.tips)
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
    count: Immutable.Map({incorrect: 0, correct: 0}),
    test: 1
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

        case 'TEST':
            return state.set('test', action.test)

        default:
            return state;
    }
}

let vizState = Immutable.Map({
    topReviews: Immutable.List(),
    topTips: Immutable.List(),
    tipDate: Immutable.List([2007, 1, 1]),
    reviewDate: Immutable.List([2007, 1, 1]),
    vizType: ''
})

function viz(state = vizState, action) {
    switch(action.type) {
        case SET_TOP_REVIEWS:
            return state.set('topReviews', Immutable.fromJS(action.reviews))

        case SET_TOP_TIPS:
            return state.set('topTips', Immutable.fromJS(action.tips))

        case SET_TIP_DATE:
            return state.set('tipDate', action.date)

        case SET_REVIEW_DATE:
            return state.set('reviewDate', Immutable.List(action.date))

        case SET_VIZ_TYPE:
            return state.set('vizType', action.vizType);

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    data,
    game,
    viz,
    routing: routeReducer
});

export default rootReducer;
