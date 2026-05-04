'use client';

import { trpc } from '@/lib/trpc/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Plus, FileText, CheckCircle2 } from 'lucide-react';

export default function TesisPage() {
  const { data: tesis, isLoading } = trpc.tesis.listar.useQuery();

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'REGISTRADA': return 'bg-blue-100 text-blue-700';
      case 'ASIGNADA': return 'bg-yellow-100 text-yellow-700';
      case 'EN_DESARROLLO': return 'bg-indigo-100 text-indigo-700';
      case 'SUSTENTADA': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Tesis</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" /> Registrar Proyecto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-600">Total Proyectos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tesis?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-600">En Desarrollo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tesis?.filter(t => t.estado === 'EN_DESARROLLO').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-600">Sustentadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tesis?.filter(t => t.estado === 'SUSTENTADA').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título del Proyecto</TableHead>
                <TableHead>Estudiante</TableHead>
                <TableHead>Asesor</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tesis?.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium max-w-md truncate">{t.titulo}</TableCell>
                  <TableCell>{`${t.estudiante.user.nombres} ${t.estudiante.user.apellidos}`}</TableCell>
                  <TableCell>{t.asesor ? `${t.asesor.user.nombres} ${t.asesor.user.apellidos}` : 'Pendiente'}</TableCell>
                  <TableCell>
                    <Badge className={getEstadoColor(t.estado)}>{t.estado}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
