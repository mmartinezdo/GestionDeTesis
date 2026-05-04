export declare const appRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: {
        token: any;
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("express").Response<any, Record<string, any>>;
        prisma: import("../prisma/prisma.service").PrismaService;
        jwt: import("@nestjs/jwt").JwtService;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    auth: import("@trpc/server").TRPCBuiltRouter<{
        ctx: {
            token: any;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            prisma: import("../prisma/prisma.service").PrismaService;
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
    practicas: import("@trpc/server").TRPCBuiltRouter<{
        ctx: {
            token: any;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            prisma: import("../prisma/prisma.service").PrismaService;
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
    tesis: import("@trpc/server").TRPCBuiltRouter<{
        ctx: {
            token: any;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            prisma: import("../prisma/prisma.service").PrismaService;
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
    dashboard: import("@trpc/server").TRPCBuiltRouter<{
        ctx: {
            token: any;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            prisma: import("../prisma/prisma.service").PrismaService;
            jwt: import("@nestjs/jwt").JwtService;
        };
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        getEstadisticas: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                role: any;
                totalEstudiantes: number;
                totalPracticasActivas: number;
                totalTesisEnCurso: number;
                totalEmpresasConvenio: number;
                practicasPorEstado: {
                    estado: import(".prisma/client").$Enums.EstadoPractica;
                    cantidad: number;
                }[];
                tesisPorEstado: {
                    estado: import(".prisma/client").$Enums.EstadoTesis;
                    cantidad: number;
                }[];
                error?: undefined;
                totalMisPracticas?: undefined;
                practicasActivas?: undefined;
                totalMisTesis?: undefined;
                tesisActivas?: undefined;
                totalPracticasAsesoradas?: undefined;
                practicasEnCurso?: undefined;
                totalTesisAsesoradas?: undefined;
                tesisEnDesarrollo?: undefined;
                message?: undefined;
            } | {
                role: any;
                error: string;
                totalEstudiantes?: undefined;
                totalPracticasActivas?: undefined;
                totalTesisEnCurso?: undefined;
                totalEmpresasConvenio?: undefined;
                practicasPorEstado?: undefined;
                tesisPorEstado?: undefined;
                totalMisPracticas?: undefined;
                practicasActivas?: undefined;
                totalMisTesis?: undefined;
                tesisActivas?: undefined;
                totalPracticasAsesoradas?: undefined;
                practicasEnCurso?: undefined;
                totalTesisAsesoradas?: undefined;
                tesisEnDesarrollo?: undefined;
                message?: undefined;
            } | {
                role: any;
                totalMisPracticas: number;
                practicasActivas: number;
                totalMisTesis: number;
                tesisActivas: number;
                practicasPorEstado: {
                    estado: string;
                    cantidad: number;
                }[];
                tesisPorEstado: {
                    estado: string;
                    cantidad: number;
                }[];
                totalEstudiantes?: undefined;
                totalPracticasActivas?: undefined;
                totalTesisEnCurso?: undefined;
                totalEmpresasConvenio?: undefined;
                error?: undefined;
                totalPracticasAsesoradas?: undefined;
                practicasEnCurso?: undefined;
                totalTesisAsesoradas?: undefined;
                tesisEnDesarrollo?: undefined;
                message?: undefined;
            } | {
                role: any;
                totalPracticasAsesoradas: number;
                practicasEnCurso: number;
                totalTesisAsesoradas: number;
                tesisEnDesarrollo: number;
                practicasPorEstado: {
                    estado: string;
                    cantidad: number;
                }[];
                tesisPorEstado: {
                    estado: string;
                    cantidad: number;
                }[];
                totalEstudiantes?: undefined;
                totalPracticasActivas?: undefined;
                totalTesisEnCurso?: undefined;
                totalEmpresasConvenio?: undefined;
                error?: undefined;
                totalMisPracticas?: undefined;
                practicasActivas?: undefined;
                totalMisTesis?: undefined;
                tesisActivas?: undefined;
                message?: undefined;
            } | {
                role: any;
                message: string;
                totalEstudiantes?: undefined;
                totalPracticasActivas?: undefined;
                totalTesisEnCurso?: undefined;
                totalEmpresasConvenio?: undefined;
                practicasPorEstado?: undefined;
                tesisPorEstado?: undefined;
                error?: undefined;
                totalMisPracticas?: undefined;
                practicasActivas?: undefined;
                totalMisTesis?: undefined;
                tesisActivas?: undefined;
                totalPracticasAsesoradas?: undefined;
                practicasEnCurso?: undefined;
                totalTesisAsesoradas?: undefined;
                tesisEnDesarrollo?: undefined;
            };
            meta: object;
        }>;
        getTopEmpresas: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: ({
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
    }>>;
    reportes: import("@trpc/server").TRPCBuiltRouter<{
        ctx: {
            token: any;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            prisma: import("../prisma/prisma.service").PrismaService;
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
    estudiantes: import("@trpc/server").TRPCBuiltRouter<{
        ctx: {
            token: any;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            prisma: import("../prisma/prisma.service").PrismaService;
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
    empresas: import("@trpc/server").TRPCBuiltRouter<{
        ctx: {
            token: any;
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            prisma: import("../prisma/prisma.service").PrismaService;
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
}>>;
export type AppRouter = typeof appRouter;
