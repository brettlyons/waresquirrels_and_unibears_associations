var express = require('express');
var router = express.Router();
var dbHelper = require ('../lib/dbHelper.js')

/* GET home page. */
router.get('/', function(req, res, next) {
//put those quantities to the DOM
  dbHelper.getColonies().then(function (colonies) {
    Promise.all(colonies.map(function (element) {
      return dbHelper.getWinsByColony(element._id)
    })).then(function(results) {
      res.render('index', {
        title: "Total Weresquirrel Extravaganza",
        colonies: colonies,
        wins: results
      });
    });
  });
});

router.get('/colony/:id', function (req, res, next) {
  dbHelper.getColonies(req.params.id).then(function (colonyRecord) {
    dbHelper.getSquirrelsPerColony(colonyRecord[0]._id).then(function(wereSquirrels) {
      return Promise.all(wereSquirrels.map(function (wereSquirrel) {
        return dbHelper.getWeresquirrelStats(wereSquirrel[0]._id);
      })).then(function (wereSquirrelStats){
        var names = wereSquirrels.map(function ( element, idx ) {
          return element[0].name;
        });
        console.log(wereSquirrelStats);
        res.render('showColony', {
          colony: names[0],
          weresquirrels: wereSquirrels,
          weresquirrelStats: wereSquirrelStats
        });
      })
    });
  });
});

module.exports = router;
