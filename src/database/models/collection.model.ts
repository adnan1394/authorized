import { Model } from 'objection';
import { BaseModel } from './base.model';
import { GroupModel } from './group.model';
import { ItemModel } from './item.model';

export class CollectionModel extends BaseModel {
  static get tableName() {
    return 'collections';
  }

  name: string;
  groupId: number;
  items: ItemModel[];
  group: GroupModel;

  static get relationMappings() {
    return {
      items: {
        modelClass: `${__dirname}/item.model`,
        relation: Model.HasManyRelation,
        join: {
          from: 'collections.id',
          to: 'items.parentId',
        },
      },
      group: {
        modelClass: `${__dirname}/group.model`,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'collections.groupId',
          to: 'groups.id',
        },
      },
    };
  }
}
