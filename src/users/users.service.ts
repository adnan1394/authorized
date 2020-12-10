import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class UsersService {
  constructor(@Inject('UserModel') private modelClass: ModelClass<UserModel>) {}
  findAll() {
    return this.modelClass.query().select('id', 'email');
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

  delete(id: number) {
    return this.modelClass
      .query()
      .delete()
      .where({ id })
      .returning('*')
      .first();
  }
}
