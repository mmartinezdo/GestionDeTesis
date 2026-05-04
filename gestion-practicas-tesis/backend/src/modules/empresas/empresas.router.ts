import { router, permissionProcedure } from '../../trpc/trpc.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const empresaSchema = z.object({
  ruc: z.string().length(11),
  razonSocial: z.string().min(3),
  direccion: z.string(),
  telefono: z.string(),
  emailContacto: z.string().email(),
  sector: z.string().optional(),
});

const convenioSchema = z.object({
  codigo: z.string(),
  fechaInicio: z.date(),
  fechaFin: z.date(),
  empresaId: z.number(),
  documentoUrl: z.string().optional(),
});

export const empresasRouter = router({
  listar: permissionProcedure('practicas:leer')
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

  obtenerPorId: permissionProcedure('practicas:leer')
    .input(z.object({ id: z.number() }))
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
      if (!empresa) throw new TRPCError({ code: 'NOT_FOUND' });
      return empresa;
    }),

  crear: permissionProcedure('usuarios:gestionar')
    .input(empresaSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.empresa.create({
        data: input
      });
    }),

  actualizar: permissionProcedure('usuarios:gestionar')
    .input(z.object({
      id: z.number(),
      data: empresaSchema.partial()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.empresa.update({
        where: { id: input.id },
        data: input.data
      });
    }),

  // Gestión de Convenios
  crearConvenio: permissionProcedure('usuarios:gestionar')
    .input(convenioSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.convenio.create({
        data: input
      });
    }),

  listarConvenios: permissionProcedure('practicas:leer')
    .query(async ({ ctx }) => {
      return ctx.prisma.convenio.findMany({
        include: { empresa: true }
      });
    }),
});
