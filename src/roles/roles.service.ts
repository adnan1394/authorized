import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { RoleModel } from 'src/database/models/role.model';
import { UsersRolesService } from 'src/users/user-roles.service';

@Injectable()
export class RolesService {
  constructor(
    private userRolesService: UsersRolesService,
    @Inject('RoleModel') private modelClass: ModelClass<RoleModel>,
  ) {}

  findAll() {
    return this.modelClass.query();
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  create(props: Partial<RoleModel>) {
    return this.modelClass.query().insert(props).returning('*');
  }

  update(id: number, props: Partial<RoleModel>) {
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
    await this.userRolesService.deleteByRoleId(id).transacting(tx);

    return this.modelClass
      .query()
      .deleteById(id)
      .returning('*')
      .first()
      .transacting(tx);
  }

  async deleteByGroupId(groupId, tx) {
    const roles = await this.modelClass.query().where({ groupId });
    return Promise.all(
      roles.map(({ id }) => this.destroyWithDependents(id, tx)),
    );
  }
}
