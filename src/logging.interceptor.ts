import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}
let meow = 0
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const START_TIME = Date.now();
    return next.handle().pipe(
      map(function (data) {
        data['time'] = Date.now() - START_TIME;
        return data;
      }),
    );
  }
}