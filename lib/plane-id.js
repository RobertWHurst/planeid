const async = require('async');

class PlaneId {

    constructor() {
        this.database = new Database();
        this.server = new Server(this.database);
    }

    start(cb) {
        async.parallel([
            cb => this.database.start(cb),
            cb => this.server.start(cb),
        ], cb);
    }
}