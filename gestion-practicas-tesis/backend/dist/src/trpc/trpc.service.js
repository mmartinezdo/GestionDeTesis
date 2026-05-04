"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeRouters = exports.router = exports.permissionProcedure = exports.hasPermissionMiddleware = exports.protectedProcedure = exports.isAuthed = exports.publicProcedure = exports.TrpcService = void 0;
exports.createContext = createContext;
const common_1 = require("@nestjs/common");
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let TrpcService = class TrpcService {
};
exports.TrpcService = TrpcService;
exports.TrpcService = TrpcService = __decorate([
    (0, common_1.Injectable)()
], TrpcService);
const prisma = new prisma_service_1.PrismaService();
const jwt = new jwt_1.JwtService();
async function createContext({ req, res, }) {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    return { token, req, res, prisma, jwt };
}
const t = server_1.initTRPC.context().create({
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof zod_1.ZodError ? error.cause.flatten() : null,
            },
        };
    },
});
exports.publicProcedure = t.procedure;
exports.isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.token)
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
    try {
        const decoded = ctx.jwt.verify(ctx.token, { secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambia_esto' });
        return next({ ctx: { ...ctx, user: decoded } });
    }
    catch {
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
    }
});
exports.protectedProcedure = t.procedure.use(exports.isAuthed);
const hasPermissionMiddleware = (permission) => t.middleware(async ({ ctx, next }) => {
    if (!ctx.token)
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
    try {
        const decoded = ctx.jwt.verify(ctx.token, { secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambia_esto' });
        const user = await ctx.prisma.user.findUnique({
            where: { id: decoded.sub },
            include: { rol: { include: { permisos: { include: { permiso: true } } } } }
        });
        if (!user?.rol)
            throw new server_1.TRPCError({ code: 'FORBIDDEN' });
        const perms = user.rol.permisos.map(p => p.permiso.nombre);
        if (!perms.includes(permission))
            throw new server_1.TRPCError({ code: 'FORBIDDEN' });
        return next({ ctx: { ...ctx, user: { ...decoded, rol: user.rol.nombre, permisos: perms } } });
    }
    catch (e) {
        if (e instanceof server_1.TRPCError)
            throw e;
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
    }
});
exports.hasPermissionMiddleware = hasPermissionMiddleware;
const permissionProcedure = (permission) => t.procedure.use((0, exports.hasPermissionMiddleware)(permission));
exports.permissionProcedure = permissionProcedure;
exports.router = t.router;
exports.mergeRouters = t.mergeRouters;
//# sourceMappingURL=trpc.service.js.map