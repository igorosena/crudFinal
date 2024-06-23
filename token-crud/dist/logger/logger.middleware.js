"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = loggerMiddleware;
function loggerMiddleware(logService) {
    return async (req, res, next) => {
        const start = Date.now();
        res.on('finish', async () => {
            const responseTime = Date.now() - start;
            const log = {
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
//# sourceMappingURL=logger.middleware.js.map