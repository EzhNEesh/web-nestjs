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

  @Get('/fetch.html')
  @Render('fetch.pug')
  @UseInterceptors(LoggingInterceptor)
  getFetch() {
    return { time: this.appService.getServerLoadTime() };
  }

  @Get('/TodoList.html')
  @Render('TodoList.pug')
  @UseInterceptors(LoggingInterceptor)
  getTodo() {
    return { time: this.appService.getServerLoadTime() };
  }

  @Get('/memes.html')
  @Render('memes.pug')
  @UseInterceptors(LoggingInterceptor)
  getMemes() {
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