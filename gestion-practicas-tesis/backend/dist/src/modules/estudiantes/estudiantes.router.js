"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estudiantesRouter = void 0;
const trpc_service_1 = require("../../trpc/trpc.service");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const estudianteSchema = zod_1.z.object({
    codigo: zod_1.z.string().min(5),
    escuela: zod_1.z.string(),
    anioIngreso: zod_1.z.number(),
    telefono: zod_1.z.string().optional(),
    direccion: zod_1.z.string().optional(),
    userId: zod_1.z.number(),
});
exports.estudiantesRouter = (0, trpc_service_1.router)({
    listar: (0, trpc_service_1.permissionProcedure)('usuarios:gestionar')
        .query(async ({ ctx }) => {
        return ctx.prisma.estudiante.findMany({
            include: {
                user: true,
                _count: {
                    select: { practicas: true, tesis: true }
                }
            }
        });
    }),
    obtenerExpediente: (0, trpc_service_1.permissionProcedure)('practicas:leer')
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .query(async ({ ctx, input }) => {
        const estudiante = await ctx.prisma.estudiante.findUnique({
            where: { id: input.id },
            include: {
                user: true,
                practicas: {
                    include: { empresa: true, asesor: { include: { user: true } } }
                },
                tesis: {
                    include: { asesor: { include: { user: true } }, jurados: { include: { asesor: { include: { user: true } } } } }
                }
            }
        });
        if (!estudiante)
            throw new server_1.TRPCError({ code: 'NOT_FOUND' });
        return estudiante;
    }),
    actualizar: (0, trpc_service_1.permissionProcedure)('usuarios:gestionar')
        .input(zod_1.z.object({
        id: zod_1.z.number(),
        data: estudianteSchema.partial()
    }))
        .mutation(async ({ ctx, input }) => {
        return ctx.prisma.estudiante.update({
            where: { id: input.id },
            data: input.data
        });
    }),
});
//# sourceMappingURL=estudiantes.router.js.map