
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('films').del()
    .then(function () {
      // Inserts seed entries
      return knex('films').insert([
        {id: 1, name: 'Fight Club', description:" Starting with Bradpit and Edward Norton. Master piece ", release_date:"23-04-2022", ratings:"4",ticket_price:45,country:"US",photo:"tr-1659867866881.jpeg"},
        {id: 2, name: 'Avengers', description:" Super heros", release_date:"23-04-2022", ratings:"4",ticket_price:45,country:"US",photo:"tr-1659867866881.jpeg"},
        {id: 3, name: 'Cast Away', description:" Tom hanks master work ", release_date:"23-04-2022", ratings:"4",ticket_price:45,country:"US",photo:"tr-1659867866881.jpeg"},
      ]);
    });
};
