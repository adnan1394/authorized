import { BaseModel } from './base.model';
import { CollectionModel } from './collection.model';
import { Model } from 'objection';

export class ItemModel extends BaseModel {
  static get tableName() {
    return 'items';
  }

  name: string;
  parentId: number;
  collection: CollectionModel;
  
  static get relationMappings() {
    return {
      collection: {
        modelClass: `${__dirname}/collection.model`,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'items.parentId',
          to: 'collections.id',
        },
      },
    };
  }
}
