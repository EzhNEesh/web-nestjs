import { Injectable } from "@nestjs/common"
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService} from "../prisma/prisma.service";
import { Prisma } from '@prisma/client';

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

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prismaService.post.update({
      where: { id: id },
      data: {
        authorId: updatePostDto['authorId'],
        imageURL: updatePostDto['imageURL'],
      } })
  }

  remove(id: number) {
    return this.prismaService.post.delete({ where: { id }});
  }
}