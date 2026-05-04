"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_service_1 = require("./trpc.service");
const auth_router_1 = require("../modules/auth/auth.router");
const practicas_router_1 = require("../modules/practicas/practicas.router");
const tesis_router_1 = require("../modules/tesis/tesis.router");
const dashboard_router_1 = require("../modules/dashboard/dashboard.router");
const reportes_router_1 = require("../modules/reportes/reportes.router");
const estudiantes_router_1 = require("../modules/estudiantes/estudiantes.router");
const empresas_router_1 = require("../modules/empresas/empresas.router");
exports.appRouter = (0, trpc_service_1.router)({
    auth: auth_router_1.authRouter,
    practicas: practicas_router_1.practicasRouter,
    tesis: tesis_router_1.tesisRouter,
    dashboard: dashboard_router_1.dashboardRouter,
    reportes: reportes_router_1.reportesRouter,
    estudiantes: estudiantes_router_1.estudiantesRouter,
    empresas: empresas_router_1.empresasRouter,
});
//# sourceMappingURL=router.js.map