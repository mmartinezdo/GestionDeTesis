"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const express_1 = require("@trpc/server/adapters/express");
const router_1 = require("./trpc/router");
const trpc_service_1 = require("./trpc/trpc.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.use('/trpc', (0, express_1.createExpressMiddleware)({
        router: router_1.appRouter,
        createContext: trpc_service_1.createContext,
    }));
    app.getHttpAdapter().get('/health', (req, res) => {
        res.status(200).send('OK');
    });
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map