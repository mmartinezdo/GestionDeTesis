import { inferAsyncReturnType } from '@trpc/server';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
export declare class TrpcService {
}
export declare function createContext({ req, res, }: {
    req: Request;
    res: Response;
}): Promise<{
    token: any;
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    prisma: PrismaService;
    jwt: JwtService;
}>;
export type Context = inferAsyncReturnType<typeof createContext>;
export declare const publicProcedure: import("@trpc/server").TRPCProcedureBuilder<{
    token: any;
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    prisma: PrismaService;
    jwt: JwtService;
}, object, object, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
export declare const isAuthed: import("@trpc/server").TRPCMiddlewareBuilder<{
    token: any;
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    prisma: PrismaService;
    jwt: JwtService;
}, object, {
    user: any;
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    token: any;
    prisma: PrismaService;
    jwt: JwtService;
}, unknown>;
export declare const protectedProcedure: import("@trpc/server").TRPCProcedureBuilder<{
    token: any;
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    prisma: PrismaService;
    jwt: JwtService;
}, object, {
    user: any;
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    token: any;
    prisma: PrismaService;
    jwt: JwtService;
}, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
export declare const hasPermissionMiddleware: (permission: string) => import("@trpc/server").TRPCMiddlewareBuilder<{
    token: any;
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    prisma: PrismaService;
    jwt: JwtService;
}, object, {
    user: any;
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    token: any;
    prisma: PrismaService;
    jwt: JwtService;
}, unknown>;
export declare const permissionProcedure: (permission: string) => import("@trpc/server").TRPCProcedureBuilder<{
    token: any;
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    prisma: PrismaService;
    jwt: JwtService;
}, object, {
    user: any;
    req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: Response<any, Record<string, any>>;
    token: any;
    prisma: PrismaService;
    jwt: JwtService;
}, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
export declare const router: import("@trpc/server").TRPCRouterBuilder<{
    ctx: {
        token: any;
        req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: Response<any, Record<string, any>>;
        prisma: PrismaService;
        jwt: JwtService;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const mergeRouters: <TRouters extends import("@trpc/server").AnyRouter[]>(...routerList: TRouters) => import("@trpc/server").TRPCMergeRouters<TRouters>;
