const PlaneId = require('./lib/plane-id');
const config  = require('./config');

const planeId = new PlaneId(config);

planeId.start(err => {
  if (err) { return console.error(err); }

  console.log('the server is running');
});
