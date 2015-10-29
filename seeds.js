var db = require('monk')('localhost/waresquirrels_unibears_and_colonies')

var unibears = db.get('unibears');
var waresquirrels = db.get('waresquirrels');
var colonies = db.get('colonies');
var duels = db.get('duels');
var waresquirrelStats = db.get('waresquirrel-stats');
var creatureContracts = db.get('creature-contracts');

var carlyBear = unibears.id(),
    rubyBear = unibears.id(),
    charlieBear = unibears.id(),
    gummyBear = unibears.id(),
    moneyBear = unibears.id(),
    egoBear = unibears.id(),
    kanyeBear = unibears.id(),
    gerbilBear = unibears.id()

var carlySq   = waresquirrels.id(),
    rubySq    = waresquirrels.id(),
    charlieSq = waresquirrels.id(),
    gummySq   = waresquirrels.id(),
    moneySq   = waresquirrels.id(),
    egoSq     = waresquirrels.id(),
    kanyeSq   = waresquirrels.id(),
    gerbilSq  = waresquirrels.id()

var highColony = colonies.id(),
    lowColony = colonies.id(),
    leftColony = colonies.id(),
    rightColony = colonies.id()

Promise.all([
  colonies.remove().then(function () {
    return Promise.all([
      colonies.insert({_id: highColony}),
      colonies.insert({_id: lowColony}),
      colonies.insert({_id: leftColony}),
      colonies.insert({_id: rightColony})
    ])
  }),

  waresquirrels.remove().then(function () {
    return Promise.all([
      waresquirrels.insert({_id: carlySq, name: "Carly"}),
      waresquirrels.insert({_id: rubySq, name: "Ruby"}),
      waresquirrels.insert({_id: charlieSq, name: "Charlie"}),
      waresquirrels.insert({_id: gummySq, name: "Gummy"}),
      waresquirrels.insert({_id: moneySq, name: "Money"}),
      waresquirrels.insert({_id: egoSq, name: "Ego"}),
      waresquirrels.insert({_id: kanyeSq, name: "Kanye"}),
      waresquirrels.insert({_id: gerbilSq, name: "Gerbil"})
    ])
  }),

  unibears.remove().then(function () {
    return Promise.all([
      unibears.insert({_id: carlyBear, name: "Carly"}),
      unibears.insert({_id: rubyBear, name: "Ruby"}),
      unibears.insert({_id: charlieBear, name: "Charlie"}),
      unibears.insert({_id: gummyBear, name: "Gummy"}),
      unibears.insert({_id: moneyBear, name: "Money"}),
      unibears.insert({_id: egoBear, name: "Ego"}),
      unibears.insert({_id: kanyeBear, name: "Kanye"}),
      unibears.insert({_id: gerbilBear, name: "Gerbil"})
    ])
  }),

  duels.remove().then(function () {
    return Promise.all([
      duels.insert({winnerId: leftColony, loserId: rightColony}),
      duels.insert({winnerId: rightColony, loserId: highColony}),
      duels.insert({winnerId: highColony, loserId: lowColony}),
      duels.insert({winnerId: lowColony, loserId: leftColony}),
      duels.insert({winnerId: leftColony, loserId: highColony}),
      duels.insert({winnerId: rightColony, loserId: lowColony})
    ])
  }),
]).then(function () {
  creatureContracts.remove().then(function () {
    colonies.find({}).then(function (colonyDocs) {
      unibears.find({}).then(function (unibearDocs) {
        var counter = 0;
        colonyDocs.forEach(function (colonyDoc) {
          creatureContracts.insert({
            timeHrs: Math.random() * 12,
            creature: unibearDoc._id,
            honey: Math.random() * 3,
            colony: unibearDocs[counter++]._id
          })
        })
      })
  }).then(function () {
    colonies.find({}).then(function (colonyDocs) {
      waresquirrels.find({}).then(function (waresquirrelDocs) {
        var counter = 0;
        colonyDocs.forEach(function (colonyDoc) {
          creatureContracts.insert({
            timeHrs: Math.random() * 12,
            creature: waresquirrelDoc._id,
            honey: Math.random() * 3,
            colony: waresquirrelDocs[counter++]._id
          })
        })
      })
    })
  })
}).then(function () {
  db.close();
})
