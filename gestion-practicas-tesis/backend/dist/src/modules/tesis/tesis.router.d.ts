export declare const tesisRouter: import("@trpc/server").TRPCBuiltRouter<{
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
            estudiante: {
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
                direccion: string | null;
                telefono: string | null;
                codigo: string;
                escuela: string;
                anioIngreso: number;
                userId: number;
            };
            asesor: {
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
                userId: number;
                especialidad: string;
                departamento: string;
            };
        } & {
            id: number;
            createdAt: Date;
            titulo: string;
            estado: import(".prisma/client").$Enums.EstadoTesis;
            estudianteId: number;
            asesorId: number | null;
            updatedAt: Date;
            archivoUrl: string | null;
            resumen: string;
            fechaRegistro: Date;
            fechaSustentacion: Date | null;
            actaUrl: string | null;
        })[];
        meta: object;
    }>;
    obtenerPorId: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: number;
        };
        output: {
            estudiante: {
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
                direccion: string | null;
                telefono: string | null;
                codigo: string;
                escuela: string;
                anioIngreso: number;
                userId: number;
            };
            asesor: {
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
                userId: number;
                especialidad: string;
                departamento: string;
            };
            avances: {
                id: number;
                descripcion: string;
                createdAt: Date;
                updatedAt: Date;
                archivoUrl: string | null;
                tesisId: number;
                fechaEntrega: Date;
                observacion: string | null;
            }[];
            jurados: ({
                asesor: {
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
                    userId: number;
                    especialidad: string;
                    departamento: string;
                };
            } & {
                id: number;
                asesorId: number;
                tesisId: number;
                dictamen: string | null;
                observaciones: string | null;
            })[];
        } & {
            id: number;
            createdAt: Date;
            titulo: string;
            estado: import(".prisma/client").$Enums.EstadoTesis;
            estudianteId: number;
            asesorId: number | null;
            updatedAt: Date;
            archivoUrl: string | null;
            resumen: string;
            fechaRegistro: Date;
            fechaSustentacion: Date | null;
            actaUrl: string | null;
        };
        meta: object;
    }>;
    registrar: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            titulo: string;
            resumen: string;
            archivoUrl?: string;
        };
        output: {
            id: number;
            createdAt: Date;
            titulo: string;
            estado: import(".prisma/client").$Enums.EstadoTesis;
            estudianteId: number;
            asesorId: number | null;
            updatedAt: Date;
            archivoUrl: string | null;
            resumen: string;
            fechaRegistro: Date;
            fechaSustentacion: Date | null;
            actaUrl: string | null;
        };
        meta: object;
    }>;
    asignarJurado: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            tesisId: number;
            asesoresIds: number[];
        };
        output: {
            success: boolean;
        };
        meta: object;
    }>;
    registrarAvance: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            tesisId: number;
            descripcion: string;
            archivoUrl?: string;
        };
        output: {
            id: number;
            descripcion: string;
            createdAt: Date;
            updatedAt: Date;
            archivoUrl: string | null;
            tesisId: number;
            fechaEntrega: Date;
            observacion: string | null;
        };
        meta: object;
    }>;
}>>;
