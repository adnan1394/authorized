import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { UserModel } from 'src/database/models/user.model';
import { UsersRolesService } from './user-roles.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>,
    private userRolesService: UsersRolesService,
  ) {}

  findAll() {
    return this.modelClass.query().select('id', 'email').eager('[roles]');
  }

  findOne(id: number) {
    return this.modelClass
      .query()
      .select('id', 'email')
      .findById(id)
      .eager('[roles]');
  }

  findByEmail(email: string) {
    return this.modelClass.query().where({ email }).first().eager('[roles]');
  }

  create(props: Partial<UserModel>) {
    return this.modelClass.query().insert(props).returning('*');
  }

  update(id: number, props: Partial<UserModel>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  async delete(id: number) {
    return transaction(this.modelClass, async (_, tx) => {
      await this.userRolesService.deleteByUserId(id).transacting(tx);
      return this.modelClass
        .query()
        .delete()
        .where({ id })
        .returning('*')
        .first()
        .transacting(tx);
    });
  }

  async addRole(userId: number, roleId: number) {
    await this.userRolesService.create({ userId, roleId });
    return this.findOne(userId);
  }

  async removeRole(userId: number, roleId: number) {
    await this.userRolesService.delete({ userId, roleId });
    return this.findOne(userId);
  }
}
