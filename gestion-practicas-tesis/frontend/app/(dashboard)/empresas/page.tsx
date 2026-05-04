'use client';

import { trpc } from '@/lib/trpc/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Building, Plus, FileText, Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function EmpresasPage() {
  const utils = trpc.useUtils();
  const { data: empresas, isLoading } = trpc.empresas.listar.useQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<any>(null);

  // Form states
  const [ruc, setRuc] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [emailContacto, setEmailContacto] = useState('');
  const [sector, setSector] = useState('');

  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
  const isAdmin = user.rol === 'ADMIN' || user.rol === 'COORDINADOR';

  const crearMutation = trpc.empresas.crear.useMutation({
    onSuccess: () => {
      toast.success('Empresa creada correctamente');
      utils.empresas.listar.invalidate();
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (err) => toast.error('Error: ' + err.message),
  });

  const actualizarMutation = trpc.empresas.actualizar.useMutation({
    onSuccess: () => {
      toast.success('Empresa actualizada correctamente');
      utils.empresas.listar.invalidate();
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (err) => toast.error('Error: ' + err.message),
  });

  const resetForm = () => {
    setRuc('');
    setRazonSocial('');
    setDireccion('');
    setTelefono('');
    setEmailContacto('');
    setSector('');
    setEditingEmpresa(null);
  };

  const handleEdit = (empresa: any) => {
    setEditingEmpresa(empresa);
    setRuc(empresa.ruc);
    setRazonSocial(empresa.razonSocial);
    setDireccion(empresa.direccion);
    setTelefono(empresa.telefono);
    setEmailContacto(empresa.emailContacto);
    setSector(empresa.sector || '');
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ruc, razonSocial, direccion, telefono, emailContacto, sector };
    if (editingEmpresa) {
      actualizarMutation.mutate({ id: editingEmpresa.id, data });
    } else {
      crearMutation.mutate(data);
    }
  };

  const filteredEmpresas = empresas?.filter(e => 
    e.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.ruc.includes(searchTerm)
  );

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Empresas Convenidas</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Ver Convenios
          </Button>
          {isAdmin && (
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" /> Nueva Empresa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingEmpresa ? 'Editar Empresa' : 'Nueva Empresa'}</DialogTitle>
                  <DialogDescription>
                    Ingrese los datos de la empresa para el convenio de prácticas.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="ruc">RUC</Label>
                      <Input id="ruc" value={ruc} onChange={(e) => setRuc(e.target.value)} maxLength={11} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="razonSocial">Razón Social</Label>
                      <Input id="razonSocial" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="direccion">Dirección</Label>
                      <Input id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Contacto</Label>
                      <Input id="email" type="email" value={emailContacto} onChange={(e) => setEmailContacto(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sector">Sector</Label>
                      <Input id="sector" value={sector} onChange={(e) => setSector(e.target.value)} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={crearMutation.isPending || actualizarMutation.isPending}>
                    {editingEmpresa ? 'Actualizar' : 'Guardar'} Empresa
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar por razón social o RUC..." 
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
                <TableHead>RUC</TableHead>
                <TableHead>Razón Social</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Prácticas</TableHead>
                <TableHead>Convenios</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmpresas?.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell className="font-medium">{empresa.ruc}</TableCell>
                  <TableCell>{empresa.razonSocial}</TableCell>
                  <TableCell>{empresa.sector || 'N/A'}</TableCell>
                  <TableCell>{empresa._count.practicas}</TableCell>
                  <TableCell>{empresa.convenios.length}</TableCell>
                  <TableCell className="text-right">
                    {isAdmin ? (
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(empresa)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm">Ver más</Button>
                    )}
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
