import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { CollectionModel } from 'src/database/models/collection.model';
import { ItemsService } from './items.service';

@Injectable()
export class CollectionsService {
  constructor(
    private itemsService: ItemsService,
    @Inject('CollectionModel') private modelClass: ModelClass<CollectionModel>,
  ) {}

  findAll() {
    return this.modelClass.query();
  }

  findAllByGroup(groupId: number) {
    return this.modelClass.query().where({ groupId });
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  findOneByGroup(id: number, groupId: number) {
    return this.modelClass.query().where({ id, groupId }).first();
  }

  create(props: Partial<CollectionModel>) {
    return this.modelClass.query().insert(props).returning('*');
  }

  update(id: number, props: Partial<CollectionModel>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  delete(id: number) {
    return transaction(this.modelClass, (_, tx) => {
      return this.destroyWithDependents(id, tx);
    });
  }

  async destroyWithDependents(id, tx) {
    await this.itemsService.deleteByCollectionId(id).transacting(tx);

    return this.modelClass
      .query()
      .deleteById(id)
      .returning('*')
      .first()
      .transacting(tx);
  }

  async deleteByGroupId(groupId: number, tx) {
    const collections = await this.modelClass.query().where({ groupId });

    return Promise.all(
      collections.map(({ id }) => this.destroyWithDependents(id, tx)),
    );
  }
}
