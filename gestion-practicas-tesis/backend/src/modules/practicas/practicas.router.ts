// backend/src/modules/practicas/practicas.router.ts
import { router, protectedProcedure, permissionProcedure } from '../../trpc/trpc.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

// Error corregido: No se debe instanciar PrismaService manualmente dentro del router.
// Se debe utilizar ctx.prisma proporcionado por el contexto de tRPC para una mejor gestión de conexiones.

const practicaSchema = z.object({
  titulo: z.string().min(5),
  descripcion: z.string().min(20),
  requisitos: z.string(),
  horasRequeridas: z.number().min(120).max(1000),
  fechaInicio: z.date(),
  fechaFin: z.date(),
  empresaId: z.number(),
});

export const practicasRouter = router({
  // Listar prácticas disponibles para estudiantes
  listarDisponibles: permissionProcedure('practicas:leer')
    .query(async ({ ctx }) => {
      return ctx.prisma.practica.findMany({
        where: {
          estado: 'POSTULADO',
          estudianteId: null, // Solo las que no tienen estudiante asignado/postulado
          fechaInicio: { gte: new Date() },
        },
        include: {
          empresa: true,
        },
        orderBy: { fechaInicio: 'asc' },
      });
    }),

  // Listar todas las prácticas (Admin/Coordinador)
  listarTodas: permissionProcedure('practicas:gestionar')
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

  // Listar postulaciones pendientes de validar (Admin)
  listarPendientes: permissionProcedure('practicas:gestionar')
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

  // Listar prácticas del estudiante logueado
  misPracticas: permissionProcedure('practicas:leer')
    .query(async ({ ctx }) => {
      // Error corregido: Uso de ctx.prisma para asegurar la gestión correcta del ciclo de vida de la conexión.
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.user.sub },
        include: { estudiante: true },
      });

      if (!user?.estudiante) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Solo estudiantes pueden acceder' });
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
        // Nota: createdAt ya existe en el esquema actualizado de Prisma.
        orderBy: { fechaInicio: 'desc' },
      });
    }),

  // Postular a una práctica
  postular: permissionProcedure('practicas:crear')
    .input(z.object({ practicaId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.user.sub },
        include: { estudiante: true },
      });

      if (!user?.estudiante) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Solo estudiantes pueden postular' });
      }

      const practica = await ctx.prisma.practica.findUnique({
        where: { id: input.practicaId },
      });

      if (!practica || practica.estado !== 'POSTULADO' || practica.estudianteId !== null) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Práctica no disponible' });
      }

      return ctx.prisma.practica.update({
        where: { id: input.practicaId },
        data: {
          estudianteId: user.estudiante.id,
          // No cambiamos el estado a ASIGNADO aún, queda en POSTULADO hasta que Admin valide
        },
      });
    }),

  // Validar postulación (Admin)
  validarPostulacion: permissionProcedure('practicas:gestionar')
    .input(z.object({ 
      practicaId: z.number(),
      accion: z.enum(['APROBAR', 'RECHAZAR'])
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

  // Registrar informe semanal (estudiante)
  registrarInforme: permissionProcedure('practicas:crear')
    .input(z.object({
      practicaId: z.number(),
      semana: z.number().min(1).max(24),
      descripcion: z.string(),
      horas: z.number().min(1).max(40),
      archivoUrl: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.user.sub },
        include: { estudiante: true },
      });

      if (!user?.estudiante) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Solo estudiantes pueden registrar informes' });
      }

      const practica = await ctx.prisma.practica.findFirst({
        where: {
          id: input.practicaId,
          estudianteId: user.estudiante.id,
        },
      });

      if (!practica) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Práctica no encontrada o no asignada a este estudiante' });
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

  // Registrar nueva oferta de práctica (Admin/Coordinador)
  crearOferta: permissionProcedure('practicas:gestionar')
    .input(practicaSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.practica.create({
        data: {
          ...input,
          estado: 'POSTULADO',
        },
      });
    }),

  // Asignar asesor a una práctica
  asignarAsesor: permissionProcedure('practicas:gestionar')
    .input(z.object({
      practicaId: z.number(),
      asesorId: z.number(),
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

  // Listar asesores disponibles
  listarAsesores: permissionProcedure('practicas:gestionar')
    .query(async ({ ctx }) => {
      return ctx.prisma.asesor.findMany({
        include: { user: true }
      });
    }),

  // Evaluar práctica (asesor)
  evaluarPractica: permissionProcedure('practicas:gestionar')
    .input(z.object({
      practicaId: z.number(),
      estado: z.enum(['FINALIZADO', 'RECHAZADO']),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.user.sub },
        include: { asesor: true },
      });

      if (!user?.asesor) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Solo asesores pueden evaluar prácticas' });
      }

      const practica = await ctx.prisma.practica.findFirst({
        where: {
          id: input.practicaId,
          asesorId: user.asesor.id,
        },
      });

      if (!practica) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Práctica no encontrada o no asignada a este asesor' });
      }

      return ctx.prisma.practica.update({
        where: { id: input.practicaId },
        data: { estado: input.estado },
      });
    }),
});