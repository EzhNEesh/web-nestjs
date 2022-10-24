import {
  Controller,
  Get,
  Post,
  Res,
  Request,
  Render,
  UseInterceptors,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './logging.interceptor';
import { LocalAuthGuard} from "./auth/local-auth.guard";
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { Response} from "express";
import { AuthExceptionFilter} from "./exceptions_filter/auth-exception.filter";
import { UsersController } from "./users/users.controller";
import { ApiBearerAuth } from "@nestjs/swagger";


@UseInterceptors(new LoggingInterceptor())
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  @Render('index.pug')
  @UseInterceptors(LoggingInterceptor)
  getIndex() {
    return { time: this.appService.getServerLoadTime() };
  }

  @Get('/index.html')
  @Render('index.pug')
  @UseInterceptors(LoggingInterceptor)
  getIndex_() {
    return { time: this.appService.getServerLoadTime() };
  }

  @Get('/neurowolves.html')
  @Render('neurowolves.pug')
  @UseInterceptors(LoggingInterceptor)
  getNeuro() {
    return { time: this.appService.getServerLoadTime() };
  }

  @Get('/memes.html')
  @Render('memes.pug')
  @UseInterceptors(LoggingInterceptor)
  getMemes() {
    return { time: this.appService.getServerLoadTime() };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('/myWolves.html')
  @Render('myWolves.pug')
  @UseInterceptors(LoggingInterceptor)
  getMyWolves() {
    return { time: this.appService.getServerLoadTime() };
  }

  @Get('/login.html')
  @Render('login.pug')
  @UseInterceptors(LoggingInterceptor)
  getLogin() {
    return { time: this.appService.getServerLoadTime() };
  }

  @Get('/register.html')
  @Render('register.pug')
  @UseInterceptors(LoggingInterceptor)
  getRegister() {
    return { time: this.appService.getServerLoadTime() };
  }

  @Get('/logout')
  logout(@Res({ passthrough: true }) res: Response){
    res.clearCookie('token');
  }
}