import { router, permissionProcedure } from '../../trpc/trpc.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const estudianteSchema = z.object({
  codigo: z.string().min(5),
  escuela: z.string(),
  anioIngreso: z.number(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  userId: z.number(),
});

export const estudiantesRouter = router({
  listar: permissionProcedure('usuarios:gestionar')
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

  obtenerExpediente: permissionProcedure('practicas:leer')
    .input(z.object({ id: z.number() }))
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
      if (!estudiante) throw new TRPCError({ code: 'NOT_FOUND' });
      return estudiante;
    }),

  actualizar: permissionProcedure('usuarios:gestionar')
    .input(z.object({
      id: z.number(),
      data: estudianteSchema.partial()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.estudiante.update({
        where: { id: input.id },
        data: input.data
      });
    }),
});
