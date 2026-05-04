export declare const reportesRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: {
        token: any;
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("express").Response<any, Record<string, any>>;
        prisma: import("../../prisma/prisma.service").PrismaService;
        jwt: import("@nestjs/jwt").JwtService;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    generarPracticas: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            estado?: string;
        };
        output: {
            base64: string;
            filename: string;
        };
        meta: object;
    }>;
    generarTesis: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: {
            base64: string;
            filename: string;
        };
        meta: object;
    }>;
    generarEstudiantes: import("@trpc/server").TRPCMutationProcedure<{
        input: void;
        output: {
            base64: string;
            filename: string;
        };
        meta: object;
    }>;
}>>;
