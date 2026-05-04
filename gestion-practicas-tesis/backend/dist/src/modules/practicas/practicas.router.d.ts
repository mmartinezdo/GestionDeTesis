export declare const practicasRouter: import("@trpc/server").TRPCBuiltRouter<{
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
    listarDisponibles: import("@trpc/server").TRPCQueryProcedure<{
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
        meta: object;
    }>;
    listarTodas: import("@trpc/server").TRPCQueryProcedure<{
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
        meta: object;
    }>;
    listarPendientes: import("@trpc/server").TRPCQueryProcedure<{
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
        meta: object;
    }>;
    misPracticas: import("@trpc/server").TRPCQueryProcedure<{
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
            informes: {
                id: number;
                descripcion: string;
                createdAt: Date;
                updatedAt: Date;
                practicaId: number;
                semana: number;
                horas: number;
                archivoUrl: string | null;
                fecha: Date;
            }[];
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
        meta: object;
    }>;
    postular: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            practicaId: number;
        };
        output: {
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
        };
        meta: object;
    }>;
    validarPostulacion: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            practicaId: number;
            accion: "APROBAR" | "RECHAZAR";
        };
        output: {
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
        };
        meta: object;
    }>;
    registrarInforme: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            practicaId: number;
            semana: number;
            descripcion: string;
            horas: number;
            archivoUrl?: string;
        };
        output: {
            id: number;
            descripcion: string;
            createdAt: Date;
            updatedAt: Date;
            practicaId: number;
            semana: number;
            horas: number;
            archivoUrl: string | null;
            fecha: Date;
        };
        meta: object;
    }>;
    crearOferta: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            titulo: string;
            descripcion: string;
            requisitos: string;
            horasRequeridas: number;
            fechaInicio: Date;
            fechaFin: Date;
            empresaId: number;
        };
        output: {
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
        };
        meta: object;
    }>;
    asignarAsesor: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            practicaId: number;
            asesorId: number;
        };
        output: {
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
        };
        meta: object;
    }>;
    listarAsesores: import("@trpc/server").TRPCQueryProcedure<{
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
        } & {
            id: number;
            userId: number;
            especialidad: string;
            departamento: string;
        })[];
        meta: object;
    }>;
    evaluarPractica: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            practicaId: number;
            estado: "FINALIZADO" | "RECHAZADO";
        };
        output: {
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
        };
        meta: object;
    }>;
}>>;
