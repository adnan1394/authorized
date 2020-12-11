import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { ItemModel } from 'src/database/models/item.model';

@Injectable()
export class ItemsService {
  constructor(@Inject('ItemModel') private modelClass: ModelClass<ItemModel>) {}

  findAll() {
    return this.modelClass.query();
  }

  findAllByCollection(parentId: number) {
    return this.modelClass.query().where({ parentId });
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  findOneByCollection(id: number, parentId: number) {
    return this.modelClass.query().where({ id, parentId }).first();
  }

  create(props: Partial<ItemModel>) {
    return this.modelClass.query().insert(props).returning('*');
  }

  update(id: number, props: Partial<ItemModel>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  updateInCollection(id: number, parentId: number, props: Partial<ItemModel>) {
    return this.modelClass
      .query()
      .patch({ ...props, parentId })
      .where({ id, parentId })
      .returning('*')
      .first();
  }

  delete(id: number) {
    return this.modelClass.query().deleteById(id).returning('*').first();
  }

  deleteInCollection(id: number, parentId: number) {
    return this.modelClass
      .query()
      .delete()
      .where({ id, parentId })
      .returning('*')
      .first();
  }

  deleteByCollectionId(parentId: number) {
    return this.modelClass.query().delete().where({ parentId }).returning('*');
  }
}
