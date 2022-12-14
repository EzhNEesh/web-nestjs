import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {
  }

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto });
  }
/*
  findAll() {
    return this.prismaService.user.findMany();
  }
*/
  async findOneById(id: number) {
    return this.prismaService.user.findUnique({where: {id}});
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({where: {email}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({ data: updateUserDto, where: { id } });
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
