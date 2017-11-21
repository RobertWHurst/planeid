const http    = require('http');
const path    = require('path');
const express = require('express');

const planeRouter = require('../route/plane');


const noop = () => {};

class Server {

  constructor(config, database) {
    this.config     = config;
    this.database   = database;
    this.expressApp = express();

    this.viewPath   = path.join(__dirname, '../view');
    this.staticPath = path.join(__dirname, '../static');

    this._createHttpServer();
    this._bindMiddleware();
    this._bindRoutes();
  }

  start(cb = noop) {
    this.httpServer.listen(this.config.server.port, cb);
  }
  
  stop(cb = noop) {
    this.httpServer.close(cb);
  }

  _createHttpServer() {
    this.httpServer = http.createServer(this.expressApp);
  }

  _bindMiddleware() {
    this.expressApp.set('views', this.viewPath);
    this.expressApp.set('view engine', 'pug');
  }

  _bindRoutes() {
    this.expressApp.use(planeRouter);
    this.expressApp.use(express.static(this.staticPath));
  }
}


module.exports = Server;
