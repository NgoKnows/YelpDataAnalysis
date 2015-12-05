import { ADD_TODO } from '../constants/constants'
import Immutable from 'immutable'
import { combineReducers } from 'redux-immutablejs'
import { routeReducer } from 'redux-simple-router'

//beginning state of app
let initialState = Immutable.Map({
    todos    : Immutable.List()
});

export default function app(state = initialState, action) {
    switch(action.type) {
        case ADD_TODO:
            return state.update('todos', (val) => {
                return val.push(action.todo);
            });

        default:
            return state;
    }
}


const rootReducer = combineReducers({
    app,
    routing: routeReducer
});

export default rootReducer;
