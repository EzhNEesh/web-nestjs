import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

export let serverLoadTime;

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const START_TIME = Date.now();
    return next.handle().pipe(
      tap(() => serverLoadTime = (Date.now() - START_TIME))
    );
  }
}