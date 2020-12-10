import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from 'src/database/models/user.model';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@Inject('UserModel') private modelClass: ModelClass<UserModel>) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.modelClass.query().where({ email }).returning('*').first();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.modelClass.query().select("id", "email").findById(id);
  }
}
