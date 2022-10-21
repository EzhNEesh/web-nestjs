import { Injectable } from "@nestjs/common"
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService} from "../prisma/prisma.service";
import { Prisma } from '@prisma/client';
import { HttpExceptionFilter } from "../exceptions_filter/http-exception.filter";

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService){ }

  create(data: Prisma.PostCreateInput) {
    return this.prismaService.post.create({
      data,
    });
  }

  findAll(params: {
    where: Prisma.PostWhereInput,
  }) {
    const { where } = params;
    return this.prismaService.post.findMany({
      where,
    });
  }

  findOne(id: number) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  async remove(userId: number, id: number) {
    const post = await this.prismaService.post.findUnique({ where: { id } });
    try {
      if (post.authorId === userId) {
        return this.prismaService.post.delete({ where: { id } });
      }
      throw new Error('permission error');
    }
    catch(e){
      return e;
    }
  }
}