import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService} from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  private usersService: UsersService;
  constructor() {
  }

  async login(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(createUserDto['email']);
    return user.password === createUserDto['password'];
  }

  async registration(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
}
