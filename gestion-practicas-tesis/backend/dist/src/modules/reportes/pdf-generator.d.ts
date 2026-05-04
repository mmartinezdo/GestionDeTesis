export declare class PdfGenerator {
    static generatePracticasReport(practicas: any[]): Promise<Buffer<ArrayBufferLike>>;
    static generateTesisReport(tesis: any[]): Promise<Buffer<ArrayBufferLike>>;
    static generateEstudiantesReport(estudiantes: any[]): Promise<Buffer<ArrayBufferLike>>;
}
