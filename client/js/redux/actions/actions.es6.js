import { ADD_TODO } from '../constants/constants.es6'
import Immutable from 'immutable'

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        rover
    }
}

export function thunk(blah) {
    return (dispatch, getState) => {
        //do stuff
    }
}