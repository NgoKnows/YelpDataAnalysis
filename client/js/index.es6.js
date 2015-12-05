import React from 'react'
import ReactDOM from 'react-dom';

import Root from 'js/containers/Root'
import setUpRealtime from './Realtime.es6.js'

import reviews from '../../analysis/reviews.json'
import tips from '../../analysis/tips.json'


console.log(reviews, tips);


ReactDOM.render(<Root />, document.getElementById('container'));

setUpRealtime();