import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserModel } from 'src/database/models/user.model';
import { NotFoundInterceptor } from 'src/shared/not-found.interceptor';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(NotFoundInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() props: Partial<UserModel>) {
    return this.usersService.create(props);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body('email') email: string,
  ) {
    return this.usersService.update(id, { email });
  }
}
