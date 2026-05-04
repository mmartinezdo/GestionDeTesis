export declare const authRouter: import("@trpc/server").TRPCBuiltRouter<{
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
    login: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            email: string;
            password: string;
        };
        output: {
            token: string;
            user: {
                id: number;
                email: string;
                nombres: string;
                apellidos: string;
                rol: string;
            };
        };
        meta: object;
    }>;
    register: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            email: string;
            password: string;
            nombres: string;
            apellidos: string;
            dni: string;
            rol?: string;
            codigoEstudiante?: string;
        };
        output: {
            success: boolean;
        };
        meta: object;
    }>;
    healthCheck: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            status: string;
        };
        meta: object;
    }>;
}>>;
