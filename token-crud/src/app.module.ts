import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { LogModule } from './log/log.module';
import { LogService } from './log/log.service';
import { loggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'trabalhologin',
      password: 'trabalhoSenha',
      database: 'erc20tokensdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TokenModule,
    UserModule,
    LogModule,
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly logService: LogService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerMiddleware(this.logService))
      .forRoutes('*');
  }
}
