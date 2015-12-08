'use strict';
import Koa from 'koa'
const app = Koa();

// Hot Module Reloading :)
// --------------------------------------------------
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import webpack from 'webpack'
import prodConfig from './webpack.config.prod'
import devConfig from './webpack.config.dev'

let config;
let compiler;
if(process.env.NODE_ENV === 'production') {
    config = prodConfig
    compiler = webpack(config);
} else {
    config = devConfig;
    compiler = webpack(config);
    app.use(webpackHotMiddleware(compiler));
}

//console.log(process.env.NODE_ENV)
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));



// Serve Static Files
// --------------------------------------------------
import path from 'path'
import serve from 'koa-static'

app.use(serve(path.resolve('client')))


// Error Handling
// --------------------------------------------------
app.use(function *(next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }
});


// Routing
// --------------------------------------------------
import * as guessAPI from './server/guessAPI'

import router from 'koa-router'
import bodyParser from 'koa-body'

let myRouter = router();
let myBodyParser = bodyParser();

myRouter
    .get('/api/guess', guessAPI.getGuesses)
    .post('/api/guess', myBodyParser, guessAPI.addGuess)

app
    .use(myRouter.routes())
    .use(myRouter.allowedMethods());


// Start Server
// --------------------------------------------------
import http from 'http'

const httpServer = http.Server(app.callback());
const port = process.env.PORT || 8000;

httpServer.listen(port, () => {
    console.log('App is listening on port', port);
});


// Live Updating
// --------------------------------------------------
import * as guessService from './server/service/guess'
import SocketIO from 'socket.io'

let io = SocketIO(httpServer)

guessService.liveUpdates(io);
