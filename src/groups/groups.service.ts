import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { GroupModel } from 'src/database/models/group.model';
import { RolesService } from 'src/roles/roles.service';
import { CollectionsService } from './collections.service';

@Injectable()
export class GroupsService {
  constructor(
    private collectionsService: CollectionsService,
    private rolesService: RolesService,
    @Inject('GroupModel') private modelClass: ModelClass<GroupModel>,
  ) {}

  findAll() {
    return this.modelClass.query();
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  create(props: Partial<GroupModel>) {
    return this.modelClass.query().insert(props).returning('*');
  }

  update(id: number, props: Partial<GroupModel>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  delete(id: number) {
    return transaction(this.modelClass, async (_, tx) => {
      await this.collectionsService.deleteByGroupId(id, tx);
      await this.rolesService.deleteByGroupId(id, tx);

      return this.modelClass
        .query()
        .deleteById(id)
        .returning('*')
        .first()
        .transacting(tx);
    });
  }
}
