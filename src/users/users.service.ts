import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Payload } from 'src/auth/auth.service';
import { LoginDTO } from 'src/auth/login.dto';
import { RegisterDTO } from './register.dto';
import { User, UserDocument, UserSchema } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(registerDTO: RegisterDTO) {
    const { username } = registerDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(registerDTO);

    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  findOne(username: string) {
    return this.userModel.findOne({ username });
  }

  sanitizeUser(user: UserDocument) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async updateUser(id: string, body: User) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }

    // not updating role. It should be updated separately for security reason
    const { name } = body;

    user.name = name;
    await user.save();
    return this.sanitizeUser(user);
  }

  async updateRole(id: string, role: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    user.role = role;
    await user.save();
    return this.sanitizeUser(user);
  }

  // Auth
  async isUserIdValid(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (user && user.revoked === false) {
      return true;
    }
    return false;
  }
}
