import { PrismaService } from '../../prisma/prisma.service';
export declare class ReportesService {
    private prisma;
    constructor(prisma: PrismaService);
    generarReportePracticas(filtros: any): Promise<Buffer<ArrayBufferLike>>;
    generarReporteTesis(filtros: any): Promise<Buffer<ArrayBufferLike>>;
}
