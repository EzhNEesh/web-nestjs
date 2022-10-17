import {
  Controller,
  Get,
  Post,
  Render,
  UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './logging.interceptor';

@UseInterceptors(new LoggingInterceptor())
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get('/myWolves.html')
  @Render('myWolves.pug')
  @UseInterceptors(LoggingInterceptor)
  getMyWolves() {
    return { time: this.appService.getServerLoadTime() };
  }

  @Get('/login')
  @Render('login.pug')
  @UseInterceptors(LoggingInterceptor)
  getLogin() {
    return { time: this.appService.getServerLoadTime() };
  }

  @Get('/register')
  @Render('register.pug')
  @UseInterceptors(LoggingInterceptor)
  getRegister() {
    return { time: this.appService.getServerLoadTime() };
  }
}