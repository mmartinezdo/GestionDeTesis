// backend/src/modules/reportes/reportes.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PdfGenerator } from './pdf-generator';

@Injectable()
export class ReportesService {
  constructor(private prisma: PrismaService) {}

  async generarReportePracticas(filtros: any) {
    const practicas = await this.prisma.practica.findMany({
      where: filtros,
      include: {
        estudiante: {
          include: { user: true },
        },
        empresa: true,
        asesor: {
          include: { user: true },
        },
        informes: true,
      },
    });

    const pdfBuffer = await PdfGenerator.generatePracticasReport(practicas);
    return pdfBuffer;
  }

  async generarReporteTesis(filtros: any) {
    const tesis = await this.prisma.tesis.findMany({
      where: filtros,
      include: {
        estudiante: {
          include: { user: true },
        },
        asesor: {
          include: { user: true },
        },
        avances: true,
        jurados: {
          include: { asesor: { include: { user: true } } },
        },
      },
    });

    const pdfBuffer = await PdfGenerator.generateTesisReport(tesis);
    return pdfBuffer;
  }
}