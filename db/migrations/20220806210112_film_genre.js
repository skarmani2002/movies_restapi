/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex, Promise) {
    return knex.schema.createTable('film_genre', function (table) {
      table.collate('utf8_unicode_ci');
      table.charset('utf8');
      table.increments('id');
      table.integer('film_id');
      table.integer('genre_id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('film_genre');
  };
  