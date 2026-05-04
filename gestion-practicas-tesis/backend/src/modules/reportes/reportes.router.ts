import { router, permissionProcedure } from '../../trpc/trpc.service';
import { z } from 'zod';
import { PdfGenerator } from './pdf-generator';
import { TRPCError } from '@trpc/server';

export const reportesRouter = router({
  generarPracticas: permissionProcedure('reportes:generar')
    .input(z.object({
      estado: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const role = ctx.user.rol;
      const userId = ctx.user.sub;

      let where: any = input.estado ? { estado: input.estado as any } : {};

      if (role === 'ESTUDIANTE') {
        const student = await ctx.prisma.estudiante.findUnique({ where: { userId } });
        where = { ...where, estudianteId: student?.id || 0 };
      } else if (role === 'ASESOR') {
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

      const buffer = await PdfGenerator.generatePracticasReport(practicas);
      
      return {
        base64: buffer.toString('base64'),
        filename: `reporte-practicas-${Date.now()}.pdf`
      };
    }),

  generarTesis: permissionProcedure('reportes:generar')
    .mutation(async ({ ctx }) => {
      const role = ctx.user.rol;
      const userId = ctx.user.sub;

      let where: any = {};

      if (role === 'ESTUDIANTE') {
        const student = await ctx.prisma.estudiante.findUnique({ where: { userId } });
        where = { estudianteId: student?.id || 0 };
      } else if (role === 'ASESOR') {
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

      const buffer = await PdfGenerator.generateTesisReport(tesis);
      return {
        base64: buffer.toString('base64'),
        filename: `reporte-tesis-${Date.now()}.pdf`
      };
    }),

  generarEstudiantes: permissionProcedure('reportes:generar')
    .mutation(async ({ ctx }) => {
      const role = ctx.user.rol;
      if (role !== 'ADMIN' && role !== 'COORDINADOR') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Solo administradores pueden generar este reporte' });
      }

      const estudiantes = await ctx.prisma.estudiante.findMany({
        include: {
          user: true,
          practicas: true,
          tesis: true,
        },
      });

      const buffer = await PdfGenerator.generateEstudiantesReport(estudiantes);
      return {
        base64: buffer.toString('base64'),
        filename: `reporte-estudiantes-${Date.now()}.pdf`
      };
    }),
});
