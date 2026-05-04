'use client';

import { trpc } from '@/lib/trpc/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Edit, UserPlus } from 'lucide-react';
import { useState } from 'react';

export default function EstudiantesPage() {
  const { data: estudiantes, isLoading } = trpc.estudiantes.listar.useQuery();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEstudiantes = estudiantes?.filter(e => 
    e.user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.codigo.includes(searchTerm)
  );

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Estudiantes</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="mr-2 h-4 w-4" /> Registrar Estudiante
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar por nombre, apellido o código..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombres y Apellidos</TableHead>
                <TableHead>Escuela</TableHead>
                <TableHead>Prácticas</TableHead>
                <TableHead>Tesis</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstudiantes?.map((estudiante) => (
                <TableRow key={estudiante.id}>
                  <TableCell className="font-medium">{estudiante.codigo}</TableCell>
                  <TableCell>{`${estudiante.user.nombres} ${estudiante.user.apellidos}`}</TableCell>
                  <TableCell>{estudiante.escuela}</TableCell>
                  <TableCell>{estudiante._count.practicas}</TableCell>
                  <TableCell>{estudiante._count.tesis}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
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
