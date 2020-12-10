import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserRoleModel } from 'src/database/models/user-role';

@Injectable()
export class UsersRolesService {
  constructor(
    @Inject('UserRoleModel') private modelClass: ModelClass<UserRoleModel>,
  ) {}

  create(props: Partial<UserRoleModel>) {
    return this.modelClass.query().insert(props).returning('*');
  }

  delete(props: Partial<UserRoleModel>) {
    return this.modelClass.query().delete().where(props).returning('*').first();
  }

  deleteByUserId(userId) {
    return this.modelClass.query().delete().where({ userId }).returning('*');
  }

  deleteByRoleId(roleId) {
    return this.modelClass.query().delete().where({ roleId }).returning('*');
  }
}
