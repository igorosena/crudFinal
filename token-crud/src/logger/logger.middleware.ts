import { Request, Response, NextFunction } from 'express';
import { LogService } from '../log/log.service';
import { CreateLogDto } from '../log/dto/create-log.dto';

export function loggerMiddleware(logService: LogService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', async () => {
      const responseTime = Date.now() - start;
      const log: CreateLogDto = {
        method: req.method,
        route: req.originalUrl,
        statusCode: res.statusCode,
        responseTime: responseTime,
      };
      await logService.create(log);
    });
    next();
  };
}
