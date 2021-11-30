import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WsExceptionFilter extends BaseExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
