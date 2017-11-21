const async    = require('async');
const Database = require('./database');
const Server   = require('./server');


const noop = () => {};

class PlaneId {

  constructor(config) {
    this.config   = config;
    this.database = new Database(config);
    this.server   = new Server(config, this.database);
  }

  start(cb = noop) {
    async.parallel([
      cb => this.database.start(cb),
      cb => this.server.start(cb),
    ], cb);
  }

  stop(cb = noop) {
    async.parallel([
      cb => this.database.stop(cb),
      cb => this.server.stop(cb),
    ], cb);
  }
}

module.exports = PlaneId;
