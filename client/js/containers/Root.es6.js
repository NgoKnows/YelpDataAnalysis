import React, { Component, PropTypes } from 'react'

//REDUX
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import Reducer from 'flux/reducers/reducer'

//DEV TOOLS
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

//ROUTING
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute } from 'react-router';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

//Components
import App from './App'
import Home from 'components/Home'
import TipsVsReviews from 'components/TipsVsReviews'


const finalCreateStore = compose(
    applyMiddleware(thunk)
    //devTools()
)(createStore);

const store = finalCreateStore(Reducer);

const history = createBrowserHistory();

syncReduxAndRouter(history, store, (state) => state.get('routing'));

export default class Root extends Component {
    render() {
        return (
                <Provider store={store}>
                    <Router history={history}>
                        <Route path="/" component={App}>
                            <IndexRoute component={TipsVsReviews}/>
                            <Route path="tipsvsreviews" component={TipsVsReviews} />
                        </Route>
                    </Router>
                </Provider>
        )
    }
}
//<IndexRoute component={Map}/>
//<Route path="/list" component={List} />
//    <Route path="/form" component={Form} />