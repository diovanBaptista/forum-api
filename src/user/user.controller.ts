import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserModel } from 'generated/prisma/models';
import { UserService } from './user.service';
import { Prisma } from 'generated/prisma/client';
import { NotFoundException } from '@nestjs/common';


@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
  async signupUser(
    @Body
    () userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userService.user({ id: Number(id) });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  
  @Put()
  async updatUser(
    @Body() userData: Prisma.UserUpdateInput,
    @Param('id') id : string
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: {id: Number(id)},
      data: userData,
    })
  }

  @Delete(':id')
  async deleteUser(@Param('id')id: string): Promise<UserModel> {
    return this.userService.deleteUser({id: Number(id)})
  }
}
