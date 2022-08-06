
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('genre').del()
    .then(function () {
      // Inserts seed entries
      return knex('genre').insert([
        {id: 1, name: 'Romantic'},
        {id: 2, name: 'Horror'},
        {id: 3, name: 'Comedy'}
      ]);
    });
};
