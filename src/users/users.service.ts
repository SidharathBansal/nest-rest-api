import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: username });
  }

  async signUp(user: User): Promise<User> {
    try {
      const { name, username, password } = user;

      if(!name || !username || !password) {
        throw new HttpException('Enter all fields', 400);
      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);

      const newUser = new this.userModel({
        name: name,
        username: username,
        password: hashedPassword,
      });
      return await newUser.save();
    } catch (error) {
      throw new HttpException('Username Already Exists', 400);
    }
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
