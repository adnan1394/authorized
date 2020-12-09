import * as Knex from 'knex';

const tableName = 'user_roles';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments().primary();
    t.integer('user_id');
    t.foreign('user_id').references('users.id');
    t.integer('role_id');
    t.foreign('role_id').references('roles.id');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}