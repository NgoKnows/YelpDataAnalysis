'use strict';
import Koa from 'koa'
const app = Koa();

// Hot Module Reloading :)
// --------------------------------------------------
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import webpack from 'webpack'
import config from './webpack.config'

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

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


//// Routing
//// --------------------------------------------------
//import * as factualAPI from './server/api/factualAPI'
//import * as eventAPI from './server/api/eventsAPI'
//
//import router from 'koa-router'
//import bodyParser from 'koa-body'
//
//let myRouter = router();
//let myBodyParser = bodyParser();
//
//myRouter
//    .get('/api/suggestions/:searchTerm', factualAPI.getSuggestions)
//    .get('/api/business/:id', factualAPI.getPlaceInfo)
//
//myRouter
//    .get('/api/events', eventAPI.getEvents)
//    .get('/api/events/:id', eventAPI.getEvent)
//    .post('/api/events', myBodyParser, eventAPI.addEvent)
//
//app
//    .use(myRouter.routes())
//    .use(myRouter.allowedMethods());


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
import * as eventService from './server/api/service/events'
import SocketIO from 'socket.io'

let io = SocketIO(httpServer)

eventService.liveUpdates(io);
