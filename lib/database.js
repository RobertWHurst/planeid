

const noop = () => {};

class Database {

  constructor() {

  }

  start(cb = noop) {
    cb(null);
  }

  stop(cb = noop) {
    cb(null);
  }
}


module.exports = Database;
