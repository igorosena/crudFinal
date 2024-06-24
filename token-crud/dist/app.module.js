"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const token_module_1 = require("./token/token.module");
const user_module_1 = require("./user/user.module");
const log_module_1 = require("./log/log.module");
const log_service_1 = require("./log/log.service");
const logger_middleware_1 = require("./logger/logger.middleware");
let AppModule = class AppModule {
    constructor(logService) {
        this.logService = logService;
    }
    configure(consumer) {
        consumer
            .apply((0, logger_middleware_1.loggerMiddleware)(this.logService))
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'postgres',
                port: 5432,
                username: 'trabalhologin',
                password: 'trabalhoSenha',
                database: 'erc20tokensdb',
                autoLoadEntities: true,
                synchronize: true,
            }),
            token_module_1.TokenModule,
            user_module_1.UserModule,
            log_module_1.LogModule,
        ],
    }),
    __metadata("design:paramtypes", [log_service_1.LogService])
], AppModule);
//# sourceMappingURL=app.module.js.map