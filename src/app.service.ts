import { Injectable } from '@nestjs/common';
import { serverLoadTime } from './logging.interceptor';

@Injectable()
export class AppService {
  getServerLoadTime(){
    return serverLoadTime;
  }

  createMessage(data: string){

  }
}
