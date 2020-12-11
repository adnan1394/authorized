import { BaseModel } from './base.model';
import { Model, ValidationError } from 'objection';
import { GroupModel } from './group.model';

export class RoleModel extends BaseModel {
  static get tableName() {
    return 'roles';
  }
  role: string;
  groupId: number;
  group: GroupModel;

  validate() {
    if (!['regular', 'manager', 'globalManager'].includes(this.role)) {
      throw new ValidationError({
        message: 'Invalid value for role',
        type: 'MyCustomError',
      });
    } else if (!this.groupId && this.role !== 'globalManager') {
      throw new ValidationError({
        message: 'groupId field can not be empty',
        type: 'MyCustomError',
      });
    }
  }

  $beforeInsert() {
    this.validate();
  }

  $beforeUpdate() {
    this.validate();
  }

  static get relationMappings() {
    return {
      group: {
        modelClass: `${__dirname}/group.model`,
        relation: Model.HasOneRelation,
        join: {
          from: 'roles.groupId',
          to: 'groups.id',
        },
      },
    };
  }
}
