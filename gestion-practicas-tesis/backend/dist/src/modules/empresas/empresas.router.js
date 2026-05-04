"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresasRouter = void 0;
const trpc_service_1 = require("../../trpc/trpc.service");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const empresaSchema = zod_1.z.object({
    ruc: zod_1.z.string().length(11),
    razonSocial: zod_1.z.string().min(3),
    direccion: zod_1.z.string(),
    telefono: zod_1.z.string(),
    emailContacto: zod_1.z.string().email(),
    sector: zod_1.z.string().optional(),
});
const convenioSchema = zod_1.z.object({
    codigo: zod_1.z.string(),
    fechaInicio: zod_1.z.date(),
    fechaFin: zod_1.z.date(),
    empresaId: zod_1.z.number(),
    documentoUrl: zod_1.z.string().optional(),
});
exports.empresasRouter = (0, trpc_service_1.router)({
    listar: (0, trpc_service_1.permissionProcedure)('practicas:leer')
        .query(async ({ ctx }) => {
        return ctx.prisma.empresa.findMany({
            include: {
                convenios: true,
                _count: {
                    select: { practicas: true }
                }
            }
        });
    }),
    obtenerPorId: (0, trpc_service_1.permissionProcedure)('practicas:leer')
        .input(zod_1.z.object({ id: zod_1.z.number() }))
        .query(async ({ ctx, input }) => {
        const empresa = await ctx.prisma.empresa.findUnique({
            where: { id: input.id },
            include: {
                convenios: true,
                representantes: {
                    include: { user: true }
                }
            }
        });
        if (!empresa)
            throw new server_1.TRPCError({ code: 'NOT_FOUND' });
        return empresa;
    }),
    crear: (0, trpc_service_1.permissionProcedure)('usuarios:gestionar')
        .input(empresaSchema)
        .mutation(async ({ ctx, input }) => {
        return ctx.prisma.empresa.create({
            data: input
        });
    }),
    actualizar: (0, trpc_service_1.permissionProcedure)('usuarios:gestionar')
        .input(zod_1.z.object({
        id: zod_1.z.number(),
        data: empresaSchema.partial()
    }))
        .mutation(async ({ ctx, input }) => {
        return ctx.prisma.empresa.update({
            where: { id: input.id },
            data: input.data
        });
    }),
    crearConvenio: (0, trpc_service_1.permissionProcedure)('usuarios:gestionar')
        .input(convenioSchema)
        .mutation(async ({ ctx, input }) => {
        return ctx.prisma.convenio.create({
            data: input
        });
    }),
    listarConvenios: (0, trpc_service_1.permissionProcedure)('practicas:leer')
        .query(async ({ ctx }) => {
        return ctx.prisma.convenio.findMany({
            include: { empresa: true }
        });
    }),
});
//# sourceMappingURL=empresas.router.js.map