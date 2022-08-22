import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './auth.types';
import { PassportStrategy } from '@nestjs/passport';
import { UserDocument } from 'src/users/user.schema';
import { UserService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // we may evaluate whether the userId carried in the decoded token matches
  // a record in our user database, or matches a list of revoked tokens.
  // Hence, this pattern of sub-classing and implementing strategy-specific
  // validation is consistent, elegant and extensible.

  async validate(payload): Promise<UserDocument> {
    const { id } = payload;
    const isUserValid = await this.userService.isUserIdValid(id);
    if (!isUserValid) {
      throw new HttpException('User revoked', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.findById(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
