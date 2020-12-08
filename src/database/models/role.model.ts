import { BaseModel } from './base.model';
import { Model } from 'objection';
import { GroupModel } from './group.model';

export class RoleModel extends BaseModel {
  static get tableName() {
    return 'roles';
  }
  role: string;
  groupId: GroupModel;

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
