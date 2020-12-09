import * as Knex from 'knex';

const tableName = 'items';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments().primary();
    t.string('name').notNullable();
    t.integer('parent_id').notNullable();
    t.foreign('parent_id').references('collections.id');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}