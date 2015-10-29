var db = require('monk')('localhost/waresquirrels_unibears_and_colonies')

var unibears = db.get('unibears');
var waresquirrels = db.get('waresquirrels');
var colonies = db.get('colonies');
var duels = db.get('duels');
var waresquirrelStats = db.get('waresquirrel-stats');
var creatureContracts = db.get('creature-contracts');

var carlyBear   = unibears.id(),
    rubyBear    = unibears.id(),
    charlieBear = unibears.id(),
    gummyBear   = unibears.id(),
    moneyBear   = unibears.id(),
    egoBear     = unibears.id(),
    kanyeBear   = unibears.id(),
    gerbilBear  = unibears.id()

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

  creatureContracts.remove().then(function () {
    return Promise.all([
      creatureContracts.insert({time: 1, creature: carlyBear, peanuts: 0, honey: 3, colony: rightColony })
      creatureContracts.insert({time: 2, creature: rubyBear, peanuts: 0, honey: 3, colony: rightColony })
      creatureContracts.insert({time: 4, creature: charlieBear, peanuts: 0, honey: 3, colony: leftColony })
      creatureContracts.insert({time: 6, creature: gummyBear, peanuts: 0, honey: 3, colony: leftColony })
      creatureContracts.insert({time: 4, creature: egoBear, peanuts: 0, honey: 3, colony: lowColony })
      creatureContracts.insert({time: 3, creature: kanyeBear, peanuts: 0, honey: 3, colony: lowColony })
      creatureContracts.insert({time: 2, creature: gerbilBear, peanuts: 0, honey: 3, colony: highColony })
      creatureContracts.insert({time: 8, creature: moneyBear, peanuts: 0, honey: 3, colony: highColony })
      creatureContracts.insert({time: 5, creature: carlySq, peanuts: 4, honey: 0, colony: rightColony })
      creatureContracts.insert({time: 3, creature: rubySq, peanuts: 4, honey: 0, colony: rightColony })
      creatureContracts.insert({time: 7, creature: charlieSq, peanuts: 4, honey: 0, colony: leftColony })
      creatureContracts.insert({time: 9, creature: gummySq, peanuts: 4, honey: 0, colony: leftColony })
      creatureContracts.insert({time: 6, creature: egoSq, peanuts: 4, honey: 0, colony: lowColony })
      creatureContracts.insert({time: 5, creature: kanyeSq, peanuts: 4, honey: 0, colony: lowColony })
      creatureContracts.insert({time: 1, creature: gerbilSq, peanuts: 4, honey: 0, colony: highColony })
      creatureContracts.insert({time: 5, creature: moneySq, peanuts: 4, honey: 0, colony: highColony })
    ])
  }),
// var waresquirrelStats = db.get('waresquirrel-stats');
  waresquirrelStats.remove({}).then(function () {
    return Promise.all([
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: carlySq,   duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: rubySq,    duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: charlieSq, duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: gummySq,   duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: moneySq,   duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: egoSq,     duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: kanyeSq,   duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: gerbilSq,  duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: carlySq,   duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: rubySq,    duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: charlieSq, duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: gummySq,   duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: moneySq,   duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: egoSq,     duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: kanyeSq,   duelId: }),
      waresquirrelStats.insert({meat: 1, garlic: 1, squirrelId: gerbilSq,  duelId: })
    ])
  })
]).then(function () {
  db.close();
});
