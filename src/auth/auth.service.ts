import * as bcrypt from 'bcrypt';

import { JwtPayload, SanitizedUser } from './auth.types';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/user.schema';
import { UserService } from 'src/users/users.service';
import { sign } from 'jsonwebtoken';

export interface Payload {
  username: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<SanitizedUser> {
    const user = await this.userService.findOne(username).exec();
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  // called when credentials are valid
  // should return appropriate response
  async login(
    user: SanitizedUser,
  ): Promise<{ user: SanitizedUser; token: { id: string } }> {
    const payload: JwtPayload = { username: user.username, id: user._id };
    return {
      user,
      token: { id: this.jwtService.sign(payload) },
    };
  }
}
