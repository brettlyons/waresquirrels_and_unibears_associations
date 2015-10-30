var db = require('monk')('localhost/mongo-weresquirrels');
var colonies = db.get('colonies');
var weresquirrels = db.get('weresquirrels');
var unibears = db.get('unibears');
var weresquirrelAgreements = db.get('weresquirrelAgreements');
var unibearAgreements = db.get('unibearAgreements');
var duels = db.get('duels');
var weresquirrelStats = db.get('weresquirrelStats');


// function get(coll, id, field) {
//   console.log(coll, id, field);
//   // field is optional
//   if(!id || id == {}) {
//     return (coll.find({}))
//   }
//   if(field) {
//     var query = {};
//     query.field = id;
//     console.log(query);
//     return coll.find(query)
//   }
//   return coll.find({_id: id})
// }

module.exports = {

  getColonies: function (optId) {
    // return get(colonies, optId);
    if(!optId || optId === {} ) {
      return (colonies.find({}));
    }
    return (colonies.find({_id: optId}));
  },

  getWinsByColony: function (colonyId) {
    // return get(duels, colonyId, winner).then(function (winnerRecords) {
    //   return winnerRecords.length;
    // });
    return duels.find({ winner: colonyId }).then(function (val) {
      return val.length;
    });
  },

  getWereAgreementsByColonyId: function(colonyId) {
    return weresquirrelAgreements.find({ colony_id: colonies.id(colonyId) });
  },

  getWeresquirrelStats: function (wereSqId) {
    return weresquirrelStats.find( { weresquirrel_id: weresquirrels.id(wereSqId) } );
  },

  getWeresquirrels: function (wereSqId) {
    return weresquirrels.find( { _id: wereSqId });
  },

  getSquirrelsPerColony: function (colonyId) {
    var that = this;
    return that.getWereAgreementsByColonyId(colonyId).then(function (wereAgreements) {
      return Promise.all(wereAgreements.map(function (wereAgreement) {
        return that.getWeresquirrels(wereAgreement.weresquirrel_id);
      }));
    });
  }
}
