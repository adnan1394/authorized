import * as Knex from 'knex';
import { RoleModel } from '../models/role.model';
import { UserRoleModel } from '../models/user-role';
import { UserModel } from '../models/user.model';

export async function seed(knex: Knex): Promise<any> {
  const role = await RoleModel.query(knex)
    .insert({ role: 'globalManager' })
    .returning('*')
    .first();

  const user = await UserModel.query(knex)
    .insert({
      email: 'admin@authorized.com',
      password: 'hello123',
    })
    .returning('*')
    .first();

  await UserRoleModel.query(knex).insert({
    userId: user.id,
    roleId: role.id,
  });
}
