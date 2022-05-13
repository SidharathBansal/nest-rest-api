import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './interfaces/users.interface';

// Guards
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Services
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): Promise<object> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signUp(@Body() addUserDto: AddUserDto): Promise<User | object> {
    return this.usersService.signUp(addUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Protected Route
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  loggedInUser(@Request() req): Promise<User> {
    return req.user;
  }

  @Delete('delete/:id')
  delete(@Param('id') id): Promise<User> {
    return this.usersService.delete(id);
  }
}
