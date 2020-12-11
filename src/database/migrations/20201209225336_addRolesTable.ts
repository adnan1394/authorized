import * as Knex from 'knex';

const tableName = 'roles';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments().primary();
    t.string('role').notNullable();
    t.integer('group_id').nullable();
    t.foreign('group_id').references('groups.id');
    t.unique(['role', 'group_id']);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
