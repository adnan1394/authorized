import { BaseModel } from './base.model';
import { Model } from 'objection';

export class GroupModel extends BaseModel {
  static get tableName() {
    return 'groups';
  }

  name: string;

  static get relationMappings() {
    return {
      collections: {
        modelClass: `${__dirname}/collection.model`,
        relation: Model.HasManyRelation,
        join: {
          from: 'groups.id',
          to: 'collections.group_id',
        },
      },
    };
  }
}
