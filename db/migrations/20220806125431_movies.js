/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex, Promise) {
    return knex.schema.createTable('films', function (table) {
      table.collate('utf8_unicode_ci');
      table.charset('utf8');
      table.increments('id');
      table.string('name', 60).notNullable().collate('utf8_unicode_ci');
      table.string('description');
      table.dateTime('release_date').defaultTo(null);
      table.string('ratings');
      table.string('ticket_price', 10).notNullable().defaultTo('').collate('utf8_unicode_ci');
      table.string('country');
      table.string('photo').defaultTo(null).collate('utf8_unicode_ci');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('films');
  };
  