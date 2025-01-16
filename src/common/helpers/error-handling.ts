// import {
//   Logger,
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   private readonly logger = new Logger(AllExceptionsFilter.name);

//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();
//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.BAD_REQUEST;

//     this.logger.error(`Status: ${status} Error: ${exception}`);

//     response.status(status).json({
//       // statusCode: status,
//       message: exception,
//       // timestamp: new Date().toISOString(),
//       // path: request.url,
//     });
//   }
// }

import {
  Logger,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;

    let responseBody: any;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      responseBody =
        typeof exceptionResponse === 'object' && 'response' in exceptionResponse
          ? exceptionResponse['response']
          : exceptionResponse;
    } else {
      responseBody = {
        message: 'An unexpected error occurred',
      };
    }

    this.logger.error(
      `Status: ${status} Error: ${JSON.stringify(responseBody)}`,
    );

    response.status(status).json(responseBody);
  }
}
