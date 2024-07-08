import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { _concatStr } from '../util';

@Injectable()
export class ReqLoggingInterceptor implements NestInterceptor {
  private readonly _logger: Logger;
  constructor() {
    this._logger = new Logger('REQUEST');
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const _startTime = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this._logger.log(
            _concatStr([
              req.method,
              req.originalUrl,
              _concatStr(['+', Date.now() - _startTime, 'ms'], ''),
            ]),
          ),
        ),
      );
  }
}
