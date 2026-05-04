"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const trpc_service_1 = require("../../trpc/trpc.service");
exports.dashboardRouter = (0, trpc_service_1.router)({
    getEstadisticas: (0, trpc_service_1.permissionProcedure)('practicas:leer')
        .query(async ({ ctx }) => {
        const role = ctx.user.rol;
        const userId = ctx.user.sub;
        if (role === 'ADMIN' || role === 'COORDINADOR') {
            const [totalEstudiantes, totalPracticasActivas, totalTesisEnCurso, totalEmpresasConvenio, practicasPorEstado, tesisPorEstado,] = await Promise.all([
                ctx.prisma.estudiante.count(),
                ctx.prisma.practica.count({
                    where: { estado: { in: ['ASIGNADO', 'EN_CURSO'] } }
                }),
                ctx.prisma.tesis.count({
                    where: { estado: { in: ['REGISTRADA', 'ASIGNADA', 'EN_DESARROLLO'] } }
                }),
                ctx.prisma.empresa.count({ where: { activo: true } }),
                ctx.prisma.practica.groupBy({
                    by: ['estado'],
                    _count: true,
                }),
                ctx.prisma.tesis.groupBy({
                    by: ['estado'],
                    _count: true,
                }),
            ]);
            return {
                role,
                totalEstudiantes,
                totalPracticasActivas,
                totalTesisEnCurso,
                totalEmpresasConvenio,
                practicasPorEstado: practicasPorEstado.map(p => ({
                    estado: p.estado,
                    cantidad: p._count,
                })),
                tesisPorEstado: tesisPorEstado.map(t => ({
                    estado: t.estado,
                    cantidad: t._count,
                })),
            };
        }
        if (role === 'ESTUDIANTE') {
            const estudiante = await ctx.prisma.estudiante.findUnique({
                where: { userId },
                include: {
                    practicas: true,
                    tesis: true,
                }
            });
            if (!estudiante)
                return { role, error: 'Estudiante no encontrado' };
            return {
                role,
                totalMisPracticas: estudiante.practicas.length,
                practicasActivas: estudiante.practicas.filter(p => ['ASIGNADO', 'EN_CURSO'].includes(p.estado)).length,
                totalMisTesis: estudiante.tesis.length,
                tesisActivas: estudiante.tesis.filter(t => ['REGISTRADA', 'ASIGNADA', 'EN_DESARROLLO'].includes(t.estado)).length,
                practicasPorEstado: Object.entries(estudiante.practicas.reduce((acc, p) => {
                    acc[p.estado] = (acc[p.estado] || 0) + 1;
                    return acc;
                }, {})).map(([estado, cantidad]) => ({ estado, cantidad })),
                tesisPorEstado: Object.entries(estudiante.tesis.reduce((acc, t) => {
                    acc[t.estado] = (acc[t.estado] || 0) + 1;
                    return acc;
                }, {})).map(([estado, cantidad]) => ({ estado, cantidad })),
            };
        }
        if (role === 'ASESOR') {
            const asesor = await ctx.prisma.asesor.findUnique({
                where: { userId },
                include: {
                    practicasAsignadas: true,
                    tesisAsignadas: true,
                }
            });
            if (!asesor)
                return { role, error: 'Asesor no encontrado' };
            return {
                role,
                totalPracticasAsesoradas: asesor.practicasAsignadas.length,
                practicasEnCurso: asesor.practicasAsignadas.filter(p => p.estado === 'EN_CURSO').length,
                totalTesisAsesoradas: asesor.tesisAsignadas.length,
                tesisEnDesarrollo: asesor.tesisAsignadas.filter(t => t.estado === 'EN_DESARROLLO').length,
                practicasPorEstado: Object.entries(asesor.practicasAsignadas.reduce((acc, p) => {
                    acc[p.estado] = (acc[p.estado] || 0) + 1;
                    return acc;
                }, {})).map(([estado, cantidad]) => ({ estado, cantidad })),
                tesisPorEstado: Object.entries(asesor.tesisAsignadas.reduce((acc, t) => {
                    acc[t.estado] = (acc[t.estado] || 0) + 1;
                    return acc;
                }, {})).map(([estado, cantidad]) => ({ estado, cantidad })),
            };
        }
        return { role, message: 'Dashboard limitado para este rol' };
    }),
    getTopEmpresas: (0, trpc_service_1.permissionProcedure)('practicas:leer')
        .query(async ({ ctx }) => {
        const role = ctx.user.rol;
        if (role !== 'ADMIN' && role !== 'COORDINADOR') {
            return [];
        }
        return ctx.prisma.empresa.findMany({
            take: 5,
            include: {
                _count: {
                    select: { practicas: true },
                },
            },
            orderBy: {
                practicas: { _count: 'desc' },
            },
        });
    }),
});
//# sourceMappingURL=dashboard.router.js.map