import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserModel } from 'generated/prisma/models';
import { UserService } from './user.service';
import { Prisma } from 'generated/prisma/client';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';


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

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<Omit<UserModel, 'password'>> {
    const user = await this.userService.user({ id: Number(id) });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }
  
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatUser(
    @Body() userData: Prisma.UserUpdateInput,
    @Param('id') id : string
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: {id: Number(id)},
      data: userData,
    })
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id')id: string): Promise<UserModel> {
    return this.userService.deleteUser({id: Number(id)})
  }
}
