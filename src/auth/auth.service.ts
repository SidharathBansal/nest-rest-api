import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Services
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<object> {
    const user = await this.usersService.findOne(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { username, password, ...rest } = user.toObject();
      console.log(`Logged in User: `);
      console.log(rest);
      return rest;
    }

    return null;
  }

  async login(user: any): Promise<object> {
    const payload = { name: user.name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
