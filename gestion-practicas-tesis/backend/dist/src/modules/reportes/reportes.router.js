"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportesRouter = void 0;
const trpc_service_1 = require("../../trpc/trpc.service");
const zod_1 = require("zod");
const pdf_generator_1 = require("./pdf-generator");
const server_1 = require("@trpc/server");
exports.reportesRouter = (0, trpc_service_1.router)({
    generarPracticas: (0, trpc_service_1.permissionProcedure)('reportes:generar')
        .input(zod_1.z.object({
        estado: zod_1.z.string().optional(),
    }))
        .mutation(async ({ ctx, input }) => {
        const role = ctx.user.rol;
        const userId = ctx.user.sub;
        let where = input.estado ? { estado: input.estado } : {};
        if (role === 'ESTUDIANTE') {
            const student = await ctx.prisma.estudiante.findUnique({ where: { userId } });
            where = { ...where, estudianteId: student?.id || 0 };
        }
        else if (role === 'ASESOR') {
            const asesor = await ctx.prisma.asesor.findUnique({ where: { userId } });
            where = { ...where, asesorId: asesor?.id || 0 };
        }
        const practicas = await ctx.prisma.practica.findMany({
            where,
            include: {
                estudiante: {
                    include: { user: true },
                },
                empresa: true,
                asesor: {
                    include: { user: true },
                },
            },
        });
        const buffer = await pdf_generator_1.PdfGenerator.generatePracticasReport(practicas);
        return {
            base64: buffer.toString('base64'),
            filename: `reporte-practicas-${Date.now()}.pdf`
        };
    }),
    generarTesis: (0, trpc_service_1.permissionProcedure)('reportes:generar')
        .mutation(async ({ ctx }) => {
        const role = ctx.user.rol;
        const userId = ctx.user.sub;
        let where = {};
        if (role === 'ESTUDIANTE') {
            const student = await ctx.prisma.estudiante.findUnique({ where: { userId } });
            where = { estudianteId: student?.id || 0 };
        }
        else if (role === 'ASESOR') {
            const asesor = await ctx.prisma.asesor.findUnique({ where: { userId } });
            where = {
                OR: [
                    { asesorId: asesor?.id || 0 },
                    { jurados: { some: { asesorId: asesor?.id || 0 } } },
                ],
            };
        }
        const tesis = await ctx.prisma.tesis.findMany({
            where,
            include: {
                estudiante: { include: { user: true } },
                asesor: { include: { user: true } },
                avances: true,
            },
        });
        const buffer = await pdf_generator_1.PdfGenerator.generateTesisReport(tesis);
        return {
            base64: buffer.toString('base64'),
            filename: `reporte-tesis-${Date.now()}.pdf`
        };
    }),
    generarEstudiantes: (0, trpc_service_1.permissionProcedure)('reportes:generar')
        .mutation(async ({ ctx }) => {
        const role = ctx.user.rol;
        if (role !== 'ADMIN' && role !== 'COORDINADOR') {
            throw new server_1.TRPCError({ code: 'FORBIDDEN', message: 'Solo administradores pueden generar este reporte' });
        }
        const estudiantes = await ctx.prisma.estudiante.findMany({
            include: {
                user: true,
                practicas: true,
                tesis: true,
            },
        });
        const buffer = await pdf_generator_1.PdfGenerator.generateEstudiantesReport(estudiantes);
        return {
            base64: buffer.toString('base64'),
            filename: `reporte-estudiantes-${Date.now()}.pdf`
        };
    }),
});
//# sourceMappingURL=reportes.router.js.map