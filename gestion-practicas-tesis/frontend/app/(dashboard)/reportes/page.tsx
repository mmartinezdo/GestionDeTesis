'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Filter, Users } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc/client';

export default function ReportesPage() {
  const generarMutation = trpc.reportes.generarPracticas.useMutation({
    onSuccess: (data) => {
      descargarPDF(data.base64, data.filename);
    },
    onError: (error) => {
      toast.error('Error al generar reporte: ' + error.message);
    }
  });

  const handleGenerarPDF = () => {
    toast.info('Generando reporte PDF...');
    generarMutation.mutate({});
  };

  const generarTesisMutation = trpc.reportes.generarTesis.useMutation({
    onSuccess: (data) => {
      descargarPDF(data.base64, data.filename);
    },
    onError: (error) => toast.error(error.message)
  });

  const generarEstudiantesMutation = trpc.reportes.generarEstudiantes.useMutation({
    onSuccess: (data) => {
      descargarPDF(data.base64, data.filename);
    },
    onError: (error) => toast.error(error.message)
  });

  const descargarPDF = (base64: string, filename: string) => {
    try {
      // Usar Buffer en el navegador si está disponible o una forma más robusta
      const byteCharacters = atob(base64);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Pequeño delay para asegurar la descarga antes de revocar
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
      
      toast.success('Reporte descargado correctamente');
    } catch (error) {
      console.error('Error al procesar el PDF:', error);
      toast.error('Error al procesar el archivo PDF');
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reportes del Sistema</h1>
        <p className="text-gray-600 mt-2">Genera informes detallados en formato PDF</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Reporte de Prácticas</CardTitle>
                <CardDescription>Resumen de todas las prácticas registradas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Este reporte incluye datos de estudiantes, empresas, estados de las prácticas y horas acumuladas.
            </p>
            <Button onClick={handleGenerarPDF} className="w-full" disabled={generarMutation.isPending}>
              <Download className="mr-2 h-4 w-4" />
              {generarMutation.isPending ? 'Generando...' : 'Generar PDF'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Reporte de Tesis</CardTitle>
                <CardDescription>Seguimiento de proyectos de tesis</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Detalle de tesis por facultad, asesor, estado y avances presentados por los estudiantes.
            </p>
            <Button 
              onClick={() => generarTesisMutation.mutate()} 
              className="w-full" 
              variant="outline"
              disabled={generarTesisMutation.isPending}
            >
              <Download className="mr-2 h-4 w-4" />
              {generarTesisMutation.isPending ? 'Generando...' : 'Generar PDF'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-700">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Reporte de Estudiantes</CardTitle>
                <CardDescription>Padrón general de estudiantes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Listado completo de estudiantes con su estado académico actual respecto a prácticas y tesis.
            </p>
            <Button 
              onClick={() => generarEstudiantesMutation.mutate()} 
              className="w-full" 
              variant="outline"
              disabled={generarEstudiantesMutation.isPending}
            >
              <Download className="mr-2 h-4 w-4" />
              {generarEstudiantesMutation.isPending ? 'Generando...' : 'Generar PDF'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
