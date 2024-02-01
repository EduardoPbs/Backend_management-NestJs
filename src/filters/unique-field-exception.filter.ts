import { QueryFailedError } from 'typeorm';
import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch } from '@nestjs/common';

@Catch(QueryFailedError)
export class UniqueFieldException extends BaseExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    if (exception.driverError.code === '23505') {
      response.status(400).json({
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'Field `code` must be unique.',
      });
    } else {
      super.catch(exception, host);
    }
  }
}
