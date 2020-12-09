import { BaseModel } from './base.model';
import { Model } from 'objection';
import { RoleModel } from './role.model';

export class UserModel extends BaseModel {
  static get tableName() {
    return 'users';
  }

  email: string;
  roles: RoleModel[];

  static get relationMappings() {
    return {
      roles: {
        modelClass: `${__dirname}/role.model`,
        relation: Model.ManyToManyRelation,
        join: {
          from: 'users.id',
          through: {
            from: 'user_roles.user_id',
            to: 'user_roles.roles_id',
          },
          to: 'roles.id',
        },
      },
    };
  }
}
