"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const trpc_service_1 = require("../../trpc/trpc.service");
const zod_1 = require("zod");
const server_1 = require("@trpc/server");
const bcrypt = require("bcryptjs");
exports.authRouter = (0, trpc_service_1.router)({
    login: trpc_service_1.publicProcedure
        .input(zod_1.z.object({ email: zod_1.z.string().email(), password: zod_1.z.string() }))
        .mutation(async ({ input, ctx }) => {
        const user = await ctx.prisma.user.findUnique({
            where: { email: input.email },
            include: { rol: true }
        });
        if (!user) {
            throw new server_1.TRPCError({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
        }
        const isPasswordValid = await bcrypt.compare(input.password, user.password);
        if (!isPasswordValid) {
            throw new server_1.TRPCError({ code: 'UNAUTHORIZED', message: 'Contraseña incorrecta' });
        }
        const token = ctx.jwt.sign({ sub: user.id, email: user.email, rol: user.rol?.nombre }, { secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambia_esto' });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                nombres: user.nombres,
                apellidos: user.apellidos,
                rol: user.rol?.nombre
            }
        };
    }),
    register: trpc_service_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        nombres: zod_1.z.string(),
        apellidos: zod_1.z.string(),
        dni: zod_1.z.string(),
        rol: zod_1.z.string().optional(),
        codigoEstudiante: zod_1.z.string().optional(),
    }))
        .mutation(async ({ input, ctx }) => {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const roleName = input.rol || 'ESTUDIANTE';
        const role = await ctx.prisma.roleInfo.findUnique({
            where: { nombre: roleName }
        });
        if (!role) {
            throw new server_1.TRPCError({ code: 'BAD_REQUEST', message: 'Rol no válido' });
        }
        const user = await ctx.prisma.user.create({
            data: {
                email: input.email,
                password: hashedPassword,
                nombres: input.nombres,
                apellidos: input.apellidos,
                dni: input.dni,
                rolId: role.id,
            }
        });
        if (roleName === 'ESTUDIANTE' && input.codigoEstudiante) {
            await ctx.prisma.estudiante.create({
                data: {
                    codigo: input.codigoEstudiante,
                    userId: user.id,
                    escuela: 'Ingeniería de Sistemas',
                    anioIngreso: new Date().getFullYear(),
                }
            });
        }
        return { success: true };
    }),
    healthCheck: trpc_service_1.publicProcedure
        .query(async () => {
        return { status: 'ok' };
    }),
});
//# sourceMappingURL=auth.router.js.map