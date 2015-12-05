import React, { Component, PropTypes } from 'react'

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import Reducer from 'flux/reducers/reducer'
import App from './App'

const finalCreateStore = compose(
    applyMiddleware(thunk)
    //devTools()
)(createStore);

const store = finalCreateStore(Reducer);

export default class Root extends Component {
    render() {
        return (
                <Provider store={store}>
                    <App />
                </Provider>
        )
    }
}