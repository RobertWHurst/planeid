const PlaneId = require('./lib/plane-id');

const planeId = new PlaneId();

planeId.start(err => {
    if (err) { return console.error(err); }

    console.log('the server is running');
});