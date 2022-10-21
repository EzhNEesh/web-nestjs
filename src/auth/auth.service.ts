import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService} from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registration(createUserDto: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async login(user: any) {
    const validateRes = await this.validateUser(user.email, user.password);
    if (validateRes) {
      const payload = { email: user.email, sub: validateRes['id'] };
      return {
        access_token: this.jwtService.sign(payload),
        userId: validateRes['id'],
        status: 201
      };
    }
    return { status: validateRes.status };
  }

  getUserId(jwt: string): number{
    return this.jwtService.decode(jwt)['sub'];
  }
}
