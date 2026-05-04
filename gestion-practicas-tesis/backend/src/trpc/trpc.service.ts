import { Injectable } from '@nestjs/common';
import { initTRPC, TRPCError } from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import { ZodError } from 'zod';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class TrpcService {}

// Singleton instance for routes (temporary fix to avoid massive refactoring)
const prisma = new PrismaService();
const jwt = new JwtService();

// Context para tRPC
export async function createContext({ 
  req, 
  res, 
}: { 
  req: Request; 
  res: Response; 
}) { 
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]; 
  return { token, req, res, prisma, jwt }; 
} 
export type Context = inferAsyncReturnType<typeof createContext>; 

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const publicProcedure = t.procedure;
export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.token) throw new TRPCError({ code: 'UNAUTHORIZED' });
  try {
    const decoded = ctx.jwt.verify(ctx.token, { secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambia_esto' });
    return next({ ctx: { ...ctx, user: decoded } });
  } catch {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});
export const protectedProcedure = t.procedure.use(isAuthed);
export const hasPermissionMiddleware = (permission: string) => t.middleware(async ({ ctx, next }) => {
  if (!ctx.token) throw new TRPCError({ code: 'UNAUTHORIZED' });
  try {
    const decoded = ctx.jwt.verify(ctx.token, { secret: process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambia_esto' }) as any;
    const user = await ctx.prisma.user.findUnique({
      where: { id: decoded.sub },
      include: { rol: { include: { permisos: { include: { permiso: true } } } } }
    });
    if (!user?.rol) throw new TRPCError({ code: 'FORBIDDEN' });
    const perms = user.rol.permisos.map(p => p.permiso.nombre);
    if (!perms.includes(permission)) throw new TRPCError({ code: 'FORBIDDEN' });
    return next({ ctx: { ...ctx, user: { ...decoded, rol: user.rol.nombre, permisos: perms } } });
  } catch (e) {
    if (e instanceof TRPCError) throw e;
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});
export const permissionProcedure = (permission: string) => t.procedure.use(hasPermissionMiddleware(permission));
export const router = t.router;
export const mergeRouters = t.mergeRouters;
