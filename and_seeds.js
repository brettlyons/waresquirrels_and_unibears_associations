require('es6-promise').polyfill();
var db = require('monk')('localhost/mongo-weresquirrels')

var colonies = db.get('colonies');
var weresquirrels = db.get('weresquirrels');
var unibears = db.get('unibears');
var weresquirrelAgreements = db.get('weresquirrelAgreements');
var unibearAgreements = db.get('unibearAgreements');
var duels = db.get('duels');
var weresquirrelStats = db.get('weresquirrelStats');
var colonyIds = [colonies.id(),colonies.id(),colonies.id(),colonies.id()]

var squirrelIds = [weresquirrels.id(), weresquirrels.id(), weresquirrels.id(), weresquirrels.id(), weresquirrels.id(), weresquirrels.id(), weresquirrels.id(), weresquirrels.id(), weresquirrels.id(), weresquirrels.id(), weresquirrels.id(), weresquirrels.id()]
var unibearIds = [unibears.id(),unibears.id(),unibears.id(),unibears.id(),unibears.id(),unibears.id(),unibears.id(),unibears.id(),unibears.id(),unibears.id(),unibears.id(),unibears.id()]

Promise.all([
  colonies.remove().then(function () {
    return Promise.all([
      colonies.insert({_id: colonyIds[0], name: 'Earth'}),
      colonies.insert({_id: colonyIds[1], name: 'Wind'}),
      colonies.insert({_id: colonyIds[2], name: 'Fire'}),
      colonies.insert({_id: colonyIds[3], name: 'Water'})
    ])
  }),

  weresquirrels.remove().then(function () {
    var promises = [];
    for (var i = 0; i < squirrelIds.length; i ++) {
      promises.push(weresquirrels.insert({_id: squirrelIds[i], name: 'Weresquirrel ' + (i + 1)}));
    }
    return Promise.all(promises)
  }),

    weresquirrelAgreements.remove().then(function () {
      return Promise.all([
        weresquirrelAgreements.insert({weresquirrel_id: squirrelIds[0], colony_id: colonyIds[0], length: 1, peanuts: 10 }),
        weresquirrelAgreements.insert({weresquirrel_id: squirrelIds[1], colony_id: colonyIds[0], length: 1, peanuts: 10 }),
        weresquirrelAgreements.insert({weresquirrel_id: squirrelIds[2], colony_id: colonyIds[1], length: 1, peanuts: 10 }),
        weresquirrelAgreements.insert({weresquirrel_id: squirrelIds[3], colony_id: colonyIds[1], length: 1, peanuts: 10 }),
        weresquirrelAgreements.insert({weresquirrel_id: squirrelIds[4], colony_id: colonyIds[2], length: 1, peanuts: 10 }),
        weresquirrelAgreements.insert({weresquirrel_id: squirrelIds[5], colony_id: colonyIds[2], length: 1, peanuts: 10 }),
        weresquirrelAgreements.insert({weresquirrel_id: squirrelIds[6], colony_id: colonyIds[3], length: 1, peanuts: 10 }),
        weresquirrelAgreements.insert({weresquirrel_id: squirrelIds[7], colony_id: colonyIds[3], length: 1, peanuts: 10 }),
      ])
    }),

    unibears.remove().then(function () {
      var promises = [];
      for (var i = 0; i < unibearIds.length; i ++) {
        promises.push(unibears.insert({_id: unibearIds[i], name: 'Unibears ' + (i + 1)}));
      }
      return Promise.all(promises)
    }),

    unibearAgreements.remove().then(function () {
      return Promise.all([
        unibearAgreements.insert({unibear_id: unibearIds[0], colony_id: colonyIds[0], length: 2, honey: 20 }),
        unibearAgreements.insert({unibear_id: unibearIds[1], colony_id: colonyIds[0], length: 2, honey: 20 }),
        unibearAgreements.insert({unibear_id: unibearIds[2], colony_id: colonyIds[1], length: 2, honey: 20 }),
        unibearAgreements.insert({unibear_id: unibearIds[3], colony_id: colonyIds[1], length: 2, honey: 20 }),
        unibearAgreements.insert({unibear_id: unibearIds[4], colony_id: colonyIds[2], length: 2, honey: 20 }),
        unibearAgreements.insert({unibear_id: unibearIds[5], colony_id: colonyIds[2], length: 2, honey: 20 }),
        unibearAgreements.insert({unibear_id: unibearIds[6], colony_id: colonyIds[3], length: 2, honey: 20 }),
        unibearAgreements.insert({unibear_id: unibearIds[7], colony_id: colonyIds[3], length: 2, honey: 20 }),
      ])
    }),

    duels.remove().then(function() {
      return Promise.all([
        duels.insert({colony_one_id: colonyIds[0], colony_two_id: colonyIds[1], winner: colonyIds[0], loser: colonyIds[1]}),
        duels.insert({colony_one_id: colonyIds[0], colony_two_id: colonyIds[2], winner: colonyIds[0], loser: colonyIds[2]}),
        duels.insert({colony_one_id: colonyIds[0], colony_two_id: colonyIds[3], winner: colonyIds[0], loser: colonyIds[3]}),

        duels.insert({colony_one_id: colonyIds[1], colony_two_id: colonyIds[2], winner: colonyIds[1], loser: colonyIds[2]}),
        duels.insert({colony_one_id: colonyIds[1], colony_two_id: colonyIds[3], winner: colonyIds[1], loser: colonyIds[3]}),

        duels.insert({colony_one_id: colonyIds[2], colony_two_id: colonyIds[3], winner: colonyIds[2], loser: colonyIds[3]}),
      ])
    }),

    weresquirrelStats.remove().then(function() {
      var colonyOneDuels = duels.find({ $or: [ { colony_one_id: colonyIds[0] }, {  colony_two_id: colonyIds[0] } ] }).then(function(colOneDuels) {
        colOneDuels.forEach(function(duel, i) {
          weresquirrelStats.insert({weresquirrel_id: squirrelIds[0], duel_id: duel._id, garlic: 10, meat: 10})
          weresquirrelStats.insert({weresquirrel_id: squirrelIds[1], duel_id: duel._id, garlic: 9, meat: 9})
        })
      })

      var colonyTwoDuels = duels.find({ $or: [ { colony_one_id: colonyIds[1] }, {  colony_two_id: colonyIds[1] } ] }).then(function(colTwoDuels) {
        colTwoDuels.forEach(function(duel, i) {
          weresquirrelStats.insert({weresquirrel_id: squirrelIds[2], duel_id: duel._id, garlic: 8, meat: 10})
          weresquirrelStats.insert({weresquirrel_id: squirrelIds[3], duel_id: duel._id, garlic: 8, meat: 10})
        })
      })

      var colonyThreeDuels = duels.find({ $or: [ { colony_one_id: colonyIds[2] }, {  colony_two_id: colonyIds[2] } ] }).then(function(colThreeDuels) {
        colThreeDuels.forEach(function(duel, i) {
          weresquirrelStats.insert({weresquirrel_id: squirrelIds[4], duel_id: duel._id, garlic: 6, meat: 10})
          weresquirrelStats.insert({weresquirrel_id: squirrelIds[5], duel_id: duel._id, garlic: 6, meat: 10})
        })
      })

      var colonyFourDuels = duels.find({ $or: [ { colony_one_id: colonyIds[3] }, {  colony_two_id: colonyIds[3] } ] }).then(function(colFourDuels) {
        colFourDuels.forEach(function(duel, i) {
          weresquirrelStats.insert({weresquirrel_id: squirrelIds[6], duel_id: duel._id, garlic: 4, meat: 10})
          weresquirrelStats.insert({weresquirrel_id: squirrelIds[7], duel_id: duel._id, garlic: 4, meat: 10})
          console.log("here")
        })
      })
    })
    ]).then(function () {
      db.close()
    });
