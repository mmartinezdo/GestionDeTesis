import { router, publicProcedure } from '../../trpc/trpc.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import * as bcrypt from 'bcryptjs';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
        include: { rol: true }
      });

      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Usuario no encontrado' });
      }

      const isPasswordValid = await bcrypt.compare(input.password, user.password);
      if (!isPasswordValid) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Contraseña incorrecta' });
      }

      const token = ctx.jwt.sign(
        { sub: user.id, email: user.email, rol: user.rol?.nombre }, 
        { secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambia_esto' }
      );

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
  register: publicProcedure
    .input(z.object({ 
      email: z.string().email(), 
      password: z.string(),
      nombres: z.string(),
      apellidos: z.string(),
      dni: z.string(),
      rol: z.string().optional(),
      codigoEstudiante: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      
      // Buscar el rol por nombre
      const roleName = input.rol || 'ESTUDIANTE';
      const role = await ctx.prisma.roleInfo.findUnique({
        where: { nombre: roleName }
      });

      if (!role) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Rol no válido' });
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
            escuela: 'Ingeniería de Sistemas', // Valor por defecto
            anioIngreso: new Date().getFullYear(),
          }
        });
      }

      return { success: true };
    }),
  healthCheck: publicProcedure
    .query(async () => {
      return { status: 'ok' };
    }),
});
