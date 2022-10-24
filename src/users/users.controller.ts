import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../exceptions_filter/http-exception.filter";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request } from "express";
import { AuthService } from "../auth/auth.service";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

  @ApiResponse({
    status: 200,
    description: 'User created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @ApiOperation({summary: 'Create new user'})
  @UseFilters(new HttpExceptionFilter())
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
/*
  @ApiResponse({
    status: 200,
    description: 'Users found',
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Get all users'})
  @UseFilters(new HttpExceptionFilter())
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
 */

  @ApiResponse({
    status: 200,
    description: 'User found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Get user by request'})
  @Get('findUser')
  async findOneByReq(@Req() req: Request) {
    const id = this.authService.getUserId(req.cookies.token);
    return await this.usersService.findOneById(id);
  }

  /*
  @ApiResponse({
    status: 200,
    description: 'User found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({summary: 'Get user by email'})
  @Get('byEmail/:email')
  async findOneByEmail(@Param('email') email: string) {
    return await this.usersService.findOneByEmail(email);
  }
   */

  @ApiResponse({
    status: 200,
    description: 'User updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'You can not change this user',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Update info about user by id'})
  @Patch('operations/update')
  async update(@Req() req: Request,
               @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(this.authService.getUserId(req.cookies.token), updateUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'User deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'You can not delete this user',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal unknown error',
  })
  @UseFilters(new HttpExceptionFilter())
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete user by id'})
  @Delete('operations/delete')
  async remove(@Req() req: Request) {
    return await this.usersService.remove(this.authService.getUserId(req.cookies.token));
  }
}
