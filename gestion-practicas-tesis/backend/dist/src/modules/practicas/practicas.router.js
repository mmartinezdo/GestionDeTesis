"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.practicasRouter = void 0;
const trpc_service_1 = require("../../trpc/trpc.service");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const practicaSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(5),
    descripcion: zod_1.z.string().min(20),
    requisitos: zod_1.z.string(),
    horasRequeridas: zod_1.z.number().min(120).max(1000),
    fechaInicio: zod_1.z.date(),
    fechaFin: zod_1.z.date(),
    empresaId: zod_1.z.number(),
});
exports.practicasRouter = (0, trpc_service_1.router)({
    listarDisponibles: (0, trpc_service_1.permissionProcedure)('practicas:leer')
        .query(async ({ ctx }) => {
        return ctx.prisma.practica.findMany({
            where: {
                estado: 'POSTULADO',
                estudianteId: null,
                fechaInicio: { gte: new Date() },
            },
            include: {
                empresa: true,
            },
            orderBy: { fechaInicio: 'asc' },
        });
    }),
    listarTodas: (0, trpc_service_1.permissionProcedure)('practicas:gestionar')
        .query(async ({ ctx }) => {
        return ctx.prisma.practica.findMany({
            include: {
                empresa: true,
                estudiante: { include: { user: true } },
                asesor: { include: { user: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }),
    listarPendientes: (0, trpc_service_1.permissionProcedure)('practicas:gestionar')
        .query(async ({ ctx }) => {
        return ctx.prisma.practica.findMany({
            where: {
                estado: 'POSTULADO',
                estudianteId: { not: null },
            },
            include: {
                empresa: true,
                estudiante: { include: { user: true } },
            },
        });
    }),
    misPracticas: (0, trpc_service_1.permissionProcedure)('practicas:leer')
        .query(async ({ ctx }) => {
        const user = await ctx.prisma.user.findUnique({
            where: { id: ctx.user.sub },
            include: { estudiante: true },
        });
        if (!user?.estudiante) {
            throw new server_1.TRPCError({ code: 'FORBIDDEN', message: 'Solo estudiantes pueden acceder' });
        }
        return ctx.prisma.practica.findMany({
            where: { estudianteId: user.estudiante.id },
            include: {
                empresa: true,
                asesor: {
                    include: { user: true },
                },
                informes: true,
            },
            orderBy: { fechaInicio: 'desc' },
        });
    }),
    postular: (0, trpc_service_1.permissionProcedure)('practicas:crear')
        .input(zod_1.z.object({ practicaId: zod_1.z.number() }))
        .mutation(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: { id: ctx.user.sub },
            include: { estudiante: true },
        });
        if (!user?.estudiante) {
            throw new server_1.TRPCError({ code: 'FORBIDDEN', message: 'Solo estudiantes pueden postular' });
        }
        const practica = await ctx.prisma.practica.findUnique({
            where: { id: input.practicaId },
        });
        if (!practica || practica.estado !== 'POSTULADO' || practica.estudianteId !== null) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Práctica no disponible' });
        }
        return ctx.prisma.practica.update({
            where: { id: input.practicaId },
            data: {
                estudianteId: user.estudiante.id,
            },
        });
    }),
    validarPostulacion: (0, trpc_service_1.permissionProcedure)('practicas:gestionar')
        .input(zod_1.z.object({
        practicaId: zod_1.z.number(),
        accion: zod_1.z.enum(['APROBAR', 'RECHAZAR'])
    }))
        .mutation(async ({ ctx, input }) => {
        if (input.accion === 'RECHAZAR') {
            return ctx.prisma.practica.update({
                where: { id: input.practicaId },
                data: {
                    estudianteId: null,
                    estado: 'POSTULADO',
                },
            });
        }
        return ctx.prisma.practica.update({
            where: { id: input.practicaId },
            data: {
                estado: 'ASIGNADO',
            },
        });
    }),
    registrarInforme: (0, trpc_service_1.permissionProcedure)('practicas:crear')
        .input(zod_1.z.object({
        practicaId: zod_1.z.number(),
        semana: zod_1.z.number().min(1).max(24),
        descripcion: zod_1.z.string(),
        horas: zod_1.z.number().min(1).max(40),
        archivoUrl: zod_1.z.string().optional(),
    }))
        .mutation(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: { id: ctx.user.sub },
            include: { estudiante: true },
        });
        if (!user?.estudiante) {
            throw new server_1.TRPCError({ code: 'FORBIDDEN', message: 'Solo estudiantes pueden registrar informes' });
        }
        const practica = await ctx.prisma.practica.findFirst({
            where: {
                id: input.practicaId,
                estudianteId: user.estudiante.id,
            },
        });
        if (!practica) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Práctica no encontrada o no asignada a este estudiante' });
        }
        return ctx.prisma.informePractica.create({
            data: {
                semana: input.semana,
                descripcion: input.descripcion,
                horas: input.horas,
                archivoUrl: input.archivoUrl,
                practicaId: input.practicaId,
            },
        });
    }),
    crearOferta: (0, trpc_service_1.permissionProcedure)('practicas:gestionar')
        .input(practicaSchema)
        .mutation(async ({ ctx, input }) => {
        return ctx.prisma.practica.create({
            data: {
                ...input,
                estado: 'POSTULADO',
            },
        });
    }),
    asignarAsesor: (0, trpc_service_1.permissionProcedure)('practicas:gestionar')
        .input(zod_1.z.object({
        practicaId: zod_1.z.number(),
        asesorId: zod_1.z.number(),
    }))
        .mutation(async ({ ctx, input }) => {
        return ctx.prisma.practica.update({
            where: { id: input.practicaId },
            data: {
                asesorId: input.asesorId,
                estado: 'EN_CURSO',
            },
        });
    }),
    listarAsesores: (0, trpc_service_1.permissionProcedure)('practicas:gestionar')
        .query(async ({ ctx }) => {
        return ctx.prisma.asesor.findMany({
            include: { user: true }
        });
    }),
    evaluarPractica: (0, trpc_service_1.permissionProcedure)('practicas:gestionar')
        .input(zod_1.z.object({
        practicaId: zod_1.z.number(),
        estado: zod_1.z.enum(['FINALIZADO', 'RECHAZADO']),
    }))
        .mutation(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: { id: ctx.user.sub },
            include: { asesor: true },
        });
        if (!user?.asesor) {
            throw new server_1.TRPCError({ code: 'FORBIDDEN', message: 'Solo asesores pueden evaluar prácticas' });
        }
        const practica = await ctx.prisma.practica.findFirst({
            where: {
                id: input.practicaId,
                asesorId: user.asesor.id,
            },
        });
        if (!practica) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Práctica no encontrada o no asignada a este asesor' });
        }
        return ctx.prisma.practica.update({
            where: { id: input.practicaId },
            data: { estado: input.estado },
        });
    }),
});
//# sourceMappingURL=practicas.router.js.map