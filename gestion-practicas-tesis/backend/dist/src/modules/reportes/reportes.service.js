"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const pdf_generator_1 = require("./pdf-generator");
let ReportesService = class ReportesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generarReportePracticas(filtros) {
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
        const pdfBuffer = await pdf_generator_1.PdfGenerator.generatePracticasReport(practicas);
        return pdfBuffer;
    }
    async generarReporteTesis(filtros) {
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
        const pdfBuffer = await pdf_generator_1.PdfGenerator.generateTesisReport(tesis);
        return pdfBuffer;
    }
};
exports.ReportesService = ReportesService;
exports.ReportesService = ReportesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportesService);
//# sourceMappingURL=reportes.service.js.map