import { Request, Response, NextFunction } from 'express';
import { LogService } from '../log/log.service';
export declare function loggerMiddleware(logService: LogService): (req: Request, res: Response, next: NextFunction) => Promise<void>;
