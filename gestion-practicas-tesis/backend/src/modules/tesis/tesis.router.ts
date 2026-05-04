import { router, permissionProcedure } from '../../trpc/trpc.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const tesisRouter = router({
  listar: permissionProcedure('tesis:leer').query(async ({ ctx }) => {
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
      if (!student) return [];
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
      if (!asesor) return [];
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
  obtenerPorId: permissionProcedure('tesis:leer')
    .input(z.object({ id: z.number() }))
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

  registrar: permissionProcedure('tesis:crear')
    .input(z.object({
      titulo: z.string().min(10),
      resumen: z.string().min(50),
      archivoUrl: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.user.sub },
        include: { estudiante: true }
      });
      if (!user?.estudiante) throw new TRPCError({ code: 'FORBIDDEN' });

      return ctx.prisma.tesis.create({
        data: {
          ...input,
          estudianteId: user.estudiante.id,
          estado: 'REGISTRADA',
        }
      });
    }),

  asignarJurado: permissionProcedure('tesis:evaluar')
    .input(z.object({
      tesisId: z.number(),
      asesoresIds: z.array(z.number()).length(3),
    }))
    .mutation(async ({ ctx, input }) => {
      const operations = input.asesoresIds.map(asesorId => 
        ctx.prisma.jurado.create({
          data: {
            tesisId: input.tesisId,
            asesorId: asesorId,
          }
        })
      );
      await Promise.all(operations);
      return { success: true };
    }),

  registrarAvance: permissionProcedure('tesis:crear')
    .input(z.object({
      tesisId: z.number(),
      descripcion: z.string(),
      archivoUrl: z.string().optional(),
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
