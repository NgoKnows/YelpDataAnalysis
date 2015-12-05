import { ADD_TODO } from '../constants/constants'
import Immutable from 'immutable'

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