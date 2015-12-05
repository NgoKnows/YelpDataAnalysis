import React from 'react'
import ReactDOM from 'react-dom';

import Root from 'js/containers/Root'
import setUpRealtime from './Realtime.es6.js'

ReactDOM.render(<Root />, document.getElementById('container'));

setUpRealtime();