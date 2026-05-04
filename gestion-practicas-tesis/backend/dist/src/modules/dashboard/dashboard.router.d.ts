export declare const dashboardRouter: import("@trpc/server").TRPCBuiltRouter<{
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
