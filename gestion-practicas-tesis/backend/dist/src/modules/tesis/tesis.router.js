"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tesisRouter = void 0;
const trpc_service_1 = require("../../trpc/trpc.service");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
exports.tesisRouter = (0, trpc_service_1.router)({
    listar: (0, trpc_service_1.permissionProcedure)('tesis:leer').query(async ({ ctx }) => {
        const role = ctx.user.rol;
        const userId = ctx.user.sub;
        if (role === 'ADMIN' || role === 'COORDINADOR') {
            return ctx.prisma.tesis.findMany({
                include: {
                    estudiante: { include: { user: true } },
                    asesor: { include: { user: true } },
                },
            });
        }
        if (role === 'ESTUDIANTE') {
            const student = await ctx.prisma.estudiante.findUnique({ where: { userId } });
            if (!student)
                return [];
            return ctx.prisma.tesis.findMany({
                where: { estudianteId: student.id },
                include: {
                    estudiante: { include: { user: true } },
                    asesor: { include: { user: true } },
                },
            });
        }
        if (role === 'ASESOR') {
            const asesor = await ctx.prisma.asesor.findUnique({ where: { userId } });
            if (!asesor)
                return [];
            return ctx.prisma.tesis.findMany({
                where: {
                    OR: [
                        { asesorId: asesor.id },
                        { jurados: { some: { asesorId: asesor.id } } },
                    ],
                },
                include: {
                    estudiante: { include: { user: true } },
                    asesor: { include: { user: true } },
                },
            });
        }
        return [];
    }),
    obtenerPorId: (0, trpc_service_1.permissionProcedure)('tesis:leer')
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .query(async ({ input, ctx }) => {
        return ctx.prisma.tesis.findUnique({
            where: { id: input.id },
            include: {
                estudiante: { include: { user: true } },
                asesor: { include: { user: true } },
                avances: true,
                jurados: { include: { asesor: { include: { user: true } } } },
            },
        });
    }),
    registrar: (0, trpc_service_1.permissionProcedure)('tesis:crear')
        .input(zod_1.z.object({
        titulo: zod_1.z.string().min(10),
        resumen: zod_1.z.string().min(50),
        archivoUrl: zod_1.z.string().optional(),
    }))
        .mutation(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: { id: ctx.user.sub },
            include: { estudiante: true }
        });
        if (!user?.estudiante)
            throw new server_1.TRPCError({ code: 'FORBIDDEN' });
        return ctx.prisma.tesis.create({
            data: {
                ...input,
                estudianteId: user.estudiante.id,
                estado: 'REGISTRADA',
            }
        });
    }),
    asignarJurado: (0, trpc_service_1.permissionProcedure)('tesis:evaluar')
        .input(zod_1.z.object({
        tesisId: zod_1.z.number(),
        asesoresIds: zod_1.z.array(zod_1.z.number()).length(3),
    }))
        .mutation(async ({ ctx, input }) => {
        const operations = input.asesoresIds.map(asesorId => ctx.prisma.jurado.create({
            data: {
                tesisId: input.tesisId,
                asesorId: asesorId,
            }
        }));
        await Promise.all(operations);
        return { success: true };
    }),
    registrarAvance: (0, trpc_service_1.permissionProcedure)('tesis:crear')
        .input(zod_1.z.object({
        tesisId: zod_1.z.number(),
        descripcion: zod_1.z.string(),
        archivoUrl: zod_1.z.string().optional(),
    }))
        .mutation(async ({ ctx, input }) => {
        return ctx.prisma.avanceTesis.create({
            data: {
                tesisId: input.tesisId,
                descripcion: input.descripcion,
                archivoUrl: input.archivoUrl,
            }
        });
    }),
});
//# sourceMappingURL=tesis.router.js.map