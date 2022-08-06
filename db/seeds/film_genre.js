
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('film_genre').del()
    .then(function () {
      // Inserts seed entries
      return knex('film_genre').insert([
        {id: 1, film_id: 1, genre_id: 1},
        {id: 2, film_id: 1, genre_id: 2},
        {id: 3, film_id: 2, genre_id: 2},
        {id: 4, film_id: 2, genre_id: 3},
        
      ]);
    });
};
