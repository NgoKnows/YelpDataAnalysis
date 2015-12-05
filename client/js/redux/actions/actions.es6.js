import { ADD_TODO } from '../constants/constants.es6'
import Immutable from 'immutable'
import { updatePath as updateRouterPath } from 'redux-simple-router'

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        rover
    }
}

// Router
// --------------------------------------------------
export const updatePath = updateRouterPath;

export function thunk(blah) {
    return (dispatch, getState) => {
        //do stuff
    }
}