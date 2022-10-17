import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  UseFilters
} from "@nestjs/common";
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../exceptions_filter/http-exception.filter";

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    status: 201,
    description: 'Post created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({summary: 'Create post'})
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Posts found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({summary: 'Get all posts'})
  @Get(':wType')
  async findAll(@Param('wType') wType: string) {
    return await this.postsService.findAll({
      where: {
        wolfType: wType,
      }
    });
  }

  @ApiResponse({
    status: 201,
    description: 'Posts found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({summary: 'Get all posts'})
  @Get('/user/:userId')
  async findAllUsersWolves(@Param('userId', ParseIntPipe) userId: number) {
    return await this.postsService.findAll({
      where: {
        authorId: userId,
      }
    });
  }

  @ApiResponse({
    status: 201,
    description: 'Post found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({summary: 'Get post by id'})
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.findOne(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Post updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'You can not change this post',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @ApiOperation({summary: 'Update post by id'})
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number,
               @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(id, updatePostDto);
  }

  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({
    status: 201,
    description: 'Post deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'You can not delete this post',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({summary: 'Delete post by id'})
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.remove(id);
  }
}