import { Global, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { CollectionModel } from './models/collection.model';
import { GroupModel } from './models/group.model';
import { ItemModel } from './models/item.model';
import { RoleModel } from './models/role.model';
import { UserRoleModel } from './models/user-role';
import { UserModel } from './models/user.model';

const models = [
  UserRoleModel,
  UserModel,
  ItemModel,
  RoleModel,
  CollectionModel,
  GroupModel,
];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex({
        client: 'pg',
        connection: process.env.DATABASE_URL,
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
