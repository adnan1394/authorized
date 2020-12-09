import * as Knex from 'knex';

const tableName = 'collections';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments().primary();
    t.string('name').notNullable();
    t.integer('group_id').notNullable();
    t.foreign('group_id').references('groups.id');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}