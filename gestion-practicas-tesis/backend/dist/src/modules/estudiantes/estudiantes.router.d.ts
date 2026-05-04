export declare const estudiantesRouter: import("@trpc/server").TRPCBuiltRouter<{
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
            _count: {
                practicas: number;
                tesis: number;
            };
        } & {
            id: number;
            direccion: string | null;
            telefono: string | null;
            codigo: string;
            escuela: string;
            anioIngreso: number;
            userId: number;
        })[];
        meta: object;
    }>;
    obtenerExpediente: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: number;
        };
        output: {
            practicas: ({
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
                descripcion: string;
                createdAt: Date;
                titulo: string;
                requisitos: string;
                horasRequeridas: number;
                fechaInicio: Date;
                fechaFin: Date;
                estado: import(".prisma/client").$Enums.EstadoPractica;
                empresaId: number;
                estudianteId: number | null;
                asesorId: number | null;
                updatedAt: Date;
            })[];
            tesis: ({
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
            })[];
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
        meta: object;
    }>;
    actualizar: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: number;
            data: {
                codigo?: string;
                escuela?: string;
                anioIngreso?: number;
                telefono?: string;
                direccion?: string;
                userId?: number;
            };
        };
        output: {
            id: number;
            direccion: string | null;
            telefono: string | null;
            codigo: string;
            escuela: string;
            anioIngreso: number;
            userId: number;
        };
        meta: object;
    }>;
}>>;
