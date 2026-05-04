export declare const empresasRouter: import("@trpc/server").TRPCBuiltRouter<{
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
    listar: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: ({
            convenios: {
                id: number;
                activo: boolean;
                fechaInicio: Date;
                fechaFin: Date;
                empresaId: number;
                codigo: string;
                documentoUrl: string | null;
            }[];
            _count: {
                practicas: number;
            };
        } & {
            id: number;
            ruc: string;
            razonSocial: string;
            direccion: string;
            telefono: string;
            emailContacto: string;
            sector: string | null;
            activo: boolean;
        })[];
        meta: object;
    }>;
    obtenerPorId: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: number;
        };
        output: {
            convenios: {
                id: number;
                activo: boolean;
                fechaInicio: Date;
                fechaFin: Date;
                empresaId: number;
                codigo: string;
                documentoUrl: string | null;
            }[];
            representantes: ({
                user: {
                    id: number;
                    createdAt: Date;
                    rolId: number | null;
                    updatedAt: Date;
                    email: string;
                    dni: string;
                    password: string;
                    nombres: string;
                    apellidos: string;
                };
            } & {
                id: number;
                telefono: string;
                empresaId: number;
                userId: number;
                cargo: string;
            })[];
        } & {
            id: number;
            ruc: string;
            razonSocial: string;
            direccion: string;
            telefono: string;
            emailContacto: string;
            sector: string | null;
            activo: boolean;
        };
        meta: object;
    }>;
    crear: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            ruc: string;
            razonSocial: string;
            direccion: string;
            telefono: string;
            emailContacto: string;
            sector?: string;
        };
        output: {
            id: number;
            ruc: string;
            razonSocial: string;
            direccion: string;
            telefono: string;
            emailContacto: string;
            sector: string | null;
            activo: boolean;
        };
        meta: object;
    }>;
    actualizar: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            data: {
                ruc?: string;
                razonSocial?: string;
                direccion?: string;
                telefono?: string;
                emailContacto?: string;
                sector?: string;
            };
        };
        output: {
            id: number;
            ruc: string;
            razonSocial: string;
            direccion: string;
            telefono: string;
            emailContacto: string;
            sector: string | null;
            activo: boolean;
        };
        meta: object;
    }>;
    crearConvenio: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            codigo: string;
            fechaInicio: Date;
            fechaFin: Date;
            empresaId: number;
            documentoUrl?: string;
        };
        output: {
            id: number;
            activo: boolean;
            fechaInicio: Date;
            fechaFin: Date;
            empresaId: number;
            codigo: string;
            documentoUrl: string | null;
        };
        meta: object;
    }>;
    listarConvenios: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: ({
            empresa: {
                id: number;
                ruc: string;
                razonSocial: string;
                direccion: string;
                telefono: string;
                emailContacto: string;
                sector: string | null;
                activo: boolean;
            };
        } & {
            id: number;
            activo: boolean;
            fechaInicio: Date;
            fechaFin: Date;
            empresaId: number;
            codigo: string;
            documentoUrl: string | null;
        })[];
        meta: object;
    }>;
}>>;
