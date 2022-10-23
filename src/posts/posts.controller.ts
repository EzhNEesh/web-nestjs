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
  UseFilters,
  UseGuards,
  Req
} from "@nestjs/common";
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../exceptions_filter/http-exception.filter";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request} from "express";
import { AuthService } from "../auth/auth.service";
import { EventsGateway} from "../gateway/events.gateway";

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly authService: AuthService,
    private eventsGateway: EventsGateway,
    ) {}

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Create post'})
  @Post()
  async create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const authorId = this.authService.getUserId(req.cookies.token);
    const data = { imageURL: createPostDto.imageURL, authorId: authorId, wolfType: createPostDto.wolfType }
    const newPost = await this.postsService.create(data);
    await this.eventsGateway.broadcast(newPost);
    return newPost;
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('user/posts')
  async findAllUsersWolves(@Req() req: Request) {
    return await this.postsService.findAll({
      where: {
        authorId: this.authService.getUserId(req.cookies.token),
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete post by id'})
  @Delete(':id')
  async remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const userId = this.authService.getUserId(req.cookies.token);
    return await this.postsService.remove(userId, id);
  }
}