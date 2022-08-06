/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
      table.collate('utf8_unicode_ci');
      table.charset('utf8');
      table.increments('id');
      table.string('name', 60).notNullable().collate('utf8_unicode_ci');
      table.string('email');
      table.string('password');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  