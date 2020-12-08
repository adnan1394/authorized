import { BaseModel } from './base.model';

export class UserRoleModel extends BaseModel {
  static get tableName() {
    return 'user_roles';
  }

  userId: number;
  roleId: number;
}
