const path   = require('path');
const fs     = require('fs');
const Router = require('express').Router;
const router = new Router();


const PLANE_IMAGE_PATHS = path.join(__dirname, '../static/images/planes');

router.get('/', getRoot);
router.get('/plane/random', getRandomPlane);
router.get('/plane/models', getPlaneModels);

function getRoot(req, res, next) {
  res.render('plane/index');
}

function getRandomPlane(req, res, next) {
  fs.readdir(PLANE_IMAGE_PATHS, (err, dir) => {
    if (err) { return next(err); }

    const index = Math.round(Math.random() * (dir.length  - 1));

    const filename = dir[index];
    const matches  = filename.split('_');
    const faction  = matches[0];
    const model    = matches[1];
    const url      = `/images/planes/${filename}`;

    res.json({ model, faction, url });
  });
}

function getPlaneModels(req, res, next) {
  fs.readdir(PLANE_IMAGE_PATHS, (err, dir) => {
    if (err) { return next(err); }

    const unknownModels = [];

    const planes = dir.map(filename => {
      const matches = filename.split('_');
      const faction = matches[0];
      const model   = matches[1];
      return { model, faction };
    }).filter(plane => {
      if (unknownModels.includes(plane.model)) { return false; }
      unknownModels.push(plane.model);
      return true;
    });

    res.json(planes);
  });
}

module.exports = router;
