import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpStatus } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { HttpExceptionFilter} from "../exceptions_filter/http-exception.filter";

@ApiTags('authorization/registration')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'User logged in',
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
  @ApiOperation({summary: 'login'})
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.login(createUserDto)
  }

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
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({summary: 'registration'})
  @Post('register')
  async registration(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registration(createUserDto)
  }
}
