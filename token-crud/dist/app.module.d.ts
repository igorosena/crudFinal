import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LogService } from './log/log.service';
export declare class AppModule implements NestModule {
    private readonly logService;
    constructor(logService: LogService);
    configure(consumer: MiddlewareConsumer): void;
}
