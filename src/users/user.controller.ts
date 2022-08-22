import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { SanitizedUser } from 'src/auth/auth.types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegisterDTO } from './register.dto';
import { User } from './user.schema';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() data: RegisterDTO) {
    const { role } = data;
    if (role === 'Admin') {
      throw new HttpException(
        'Only admin can create other admin',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.userService.create(data);
    const { name, username, _id } = user;

    const sanitizedUser: SanitizedUser = {
      _id,
      name,
      username,
      role,
      id: _id,
    };

    return this.authService.login(sanitizedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signup-admin')
  async signupAdmin(@Body() data: RegisterDTO, @Req() req) {
    const { user } = req;
    if (user.role !== 'Admin') {
      throw new HttpException(
        'You have to be an admin to create another admin',
        HttpStatus.FORBIDDEN,
      );
    }

    const createdUser = await this.userService.create({
      ...data,
      role: 'Admin',
    });
    const { name, username, _id, role } = createdUser;

    const sanitizedUser: SanitizedUser = {
      _id,
      name,
      username,
      role,
      id: _id,
    };

    return this.authService.login(sanitizedUser);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const { user } = req;
    return this.authService.login({ ...user, id: user._id });
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    const { user } = req;
    const { id } = user;
    const fetchedUser = await this.userService.findById(id);
    const clonedUser = fetchedUser.toObject();
    if (clonedUser.role === 'Admin') {
      return await this.userService.findAll();
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Req() req,
    @Param('id') userId: string,
    @Body() body: User,
  ) {
    const { user } = req;
    const { id: loggedInUserId } = user;
    // find if loggedIn user is admin. Only admin can update role
    const fetchedUser = await this.userService.findById(loggedInUserId);
    const clonedUser = fetchedUser.toObject();
    if (clonedUser.role === 'Admin') {
      return await this.userService.updateUser(userId, body);
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Patch('/role/:id')
  @UseGuards(JwtAuthGuard)
  async updateRole(
    @Req() req,
    @Param('id') userId: string,
    @Body() body: { role: string },
  ) {
    const { user } = req;
    const { id: loggedInUserId } = user;
    // find if current user is admin. Only admin can update role
    const fetchedUser = await this.userService.findById(loggedInUserId);
    const clonedUser = fetchedUser.toObject();
    if (clonedUser.role === 'Admin') {
      return await this.userService.updateRole(userId, body.role);
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
