// frontend/app/(dashboard)/practicas/page.tsx
'use client';

import { trpc } from '@/lib/trpc/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Calendar, Clock, Building2, FileText, CheckCircle, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Definir tipos para los estados
type EstadoPractica = 'POSTULADO' | 'ASIGNADO' | 'EN_CURSO' | 'FINALIZADO' | 'RECHAZADO';

// Función corregida que devuelve solo las props necesarias para Badge
const getEstadoBadge = (practica: any) => {
  const { estado, estudianteId } = practica;
  
  if (estado === 'POSTULADO' && estudianteId !== null) {
    return { label: 'Pendiente de Validación', variant: 'outline' as const };
  }

  const estados: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' }> = {
    POSTULADO: { label: 'Disponible', variant: 'default' },
    ASIGNADO: { label: 'Asignado', variant: 'secondary' },
    EN_CURSO: { label: 'En Curso', variant: 'default' },
    FINALIZADO: { label: 'Finalizado', variant: 'success' },
    RECHAZADO: { label: 'Rechazado', variant: 'destructive' },
  };
  return estados[estado] || { label: estado, variant: 'default' as const };
};

// Modal para ver informes
function VerInformesModal({ practica, open, onOpenChange }: { 
  practica: any; 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  if (!practica) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Informes de Práctica</DialogTitle>
          <DialogDescription>
            {practica.titulo} - {practica.empresa?.razonSocial || 'Empresa no especificada'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {practica.informes?.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No hay informes registrados aún</p>
          ) : (
            practica.informes?.map((informe: any, index: number) => (
              <Card key={informe.id}>
                <CardHeader>
                  <CardTitle className="text-lg">Semana {informe.semana}</CardTitle>
                  <CardDescription>
                    Fecha: {format(new Date(informe.fecha), "dd 'de' MMMM, yyyy", { locale: es })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">{informe.descripcion}</p>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Horas: {informe.horas}</span>
                    {informe.archivoUrl && (
                      <a href={informe.archivoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Ver archivo
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Modal para nuevo informe
function NuevoInformeModal({ practicaId, onSuccess, open, onOpenChange }: { 
  practicaId: number;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [semana, setSemana] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horas, setHoras] = useState('');
  
  const registrarInformeMutation = trpc.practicas.registrarInforme.useMutation({
    onSuccess: () => {
      toast.success('Informe registrado exitosamente');
      onSuccess();
      onOpenChange(false);
      setSemana('');
      setDescripcion('');
      setHoras('');
    },
    onError: (error) => {
      toast.error('Error al registrar informe: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!semana || !descripcion || !horas) {
      toast.error('Por favor complete todos los campos');
      return;
    }
    registrarInformeMutation.mutate({
      practicaId,
      semana: parseInt(semana),
      descripcion,
      horas: parseInt(horas),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Nuevo Informe</DialogTitle>
          <DialogDescription>
            Complete la información del informe semanal de práctica
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="semana">Número de Semana</Label>
            <Input
              id="semana"
              type="number"
              min="1"
              max="24"
              value={semana}
              onChange={(e) => setSemana(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="horas">Horas trabajadas</Label>
            <Input
              id="horas"
              type="number"
              min="1"
              max="40"
              value={horas}
              onChange={(e) => setHoras(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción de actividades</Label>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={registrarInformeMutation.isPending}>
            {registrarInformeMutation.isPending ? 'Registrando...' : 'Registrar Informe'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function PracticasPage() {
  const utils = trpc.useUtils();
  const [modalInformesOpen, setModalInformesOpen] = useState(false);
  const [modalNuevoInformeOpen, setModalNuevoInformeOpen] = useState(false);
  const [selectedPractica, setSelectedPractica] = useState<any>(null);

  // Form states for creating/editing offers
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const [offerRequirements, setOfferRequirements] = useState('');
  const [offerHours, setOfferHours] = useState('160');
  const [offerStartDate, setOfferStartDate] = useState('');
  const [offerEndDate, setOfferEndDate] = useState('');
  const [offerEmpresaId, setOfferEmpresaId] = useState('');

  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
  const userRole = user.rol || 'INVITADO';
  const isAdmin = ['ADMIN', 'COORDINADOR'].includes(userRole);
  
  const { data: practicasDisponibles, isLoading: loadingDisponibles, refetch: refetchDisponibles } = trpc.practicas.listarDisponibles.useQuery();
  const { data: misPracticas, isLoading: loadingMisPracticas, refetch: refetchMisPracticas } = trpc.practicas.misPracticas.useQuery();
  const { data: todasLasPracticas, refetch: refetchTodas } = trpc.practicas.listarTodas.useQuery(undefined, {
    enabled: isAdmin
  });
  const { data: pendientes, refetch: refetchPendientes } = trpc.practicas.listarPendientes.useQuery(undefined, {
    enabled: isAdmin
  });
  const { data: empresas } = trpc.empresas.listar.useQuery(undefined, {
    enabled: isAdmin
  });

  const crearOfertaMutation = trpc.practicas.crearOferta.useMutation({
    onSuccess: () => {
      toast.success('Oferta de práctica creada');
      setIsOfferDialogOpen(false);
      resetOfferForm();
      refetchDisponibles();
      refetchTodas();
    },
    onError: (err) => toast.error('Error: ' + err.message)
  });

  const resetOfferForm = () => {
    setOfferTitle('');
    setOfferDescription('');
    setOfferRequirements('');
    setOfferHours('160');
    setOfferStartDate('');
    setOfferEndDate('');
    setOfferEmpresaId('');
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    crearOfertaMutation.mutate({
      titulo: offerTitle,
      descripcion: offerDescription,
      requisitos: offerRequirements,
      horasRequeridas: parseInt(offerHours),
      fechaInicio: new Date(offerStartDate),
      fechaFin: new Date(offerEndDate),
      empresaId: parseInt(offerEmpresaId),
    });
  };

  const getEstudianteName = (p: any) => {
    if (p.estudiante?.user) {
      return `${p.estudiante.user.nombres} ${p.estudiante.user.apellidos}`;
    }
    return 'Sin postular';
  };

  const getAsesorName = (p: any) => {
    if (p.asesor?.user) {
      return `${p.asesor.user.nombres} ${p.asesor.user.apellidos}`;
    }
    return 'No asignado';
  };
  
  const postularMutation = trpc.practicas.postular.useMutation({
    onSuccess: () => {
      toast.success('¡Postulación enviada! Pendiente de validación por un administrador.');
      refetchDisponibles();
      refetchMisPracticas();
    },
    onError: (error) => {
      toast.error('Error al postular: ' + error.message);
    },
  });

  const validarPostulacionMutation = trpc.practicas.validarPostulacion.useMutation({
    onSuccess: () => {
      toast.success('Acción realizada con éxito');
      refetchPendientes();
      refetchTodas();
    },
    onError: (error) => {
      toast.error('Error: ' + error.message);
    },
  });

  const handleVerInformes = (practica: any) => {
    setSelectedPractica(practica);
    setModalInformesOpen(true);
  };

  const handleNuevoInforme = (practica: any) => {
    setSelectedPractica(practica);
    setModalNuevoInformeOpen(true);
  };

  const handleRefresh = () => {
    refetchMisPracticas();
  };

  // Función para calcular progreso
  const calcularProgreso = (practica: any) => {
    const horasRealizadas = practica.informes?.reduce((sum: number, inf: any) => sum + inf.horas, 0) || 0;
    return (horasRealizadas / practica.horasRequeridas) * 100;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Prácticas Preprofesionales</h1>
          <p className="text-gray-600 mt-2">Postula a prácticas y da seguimiento a tus informes</p>
        </div>
        {isAdmin && (
          <Dialog open={isOfferDialogOpen} onOpenChange={(open) => {
            setIsOfferDialogOpen(open);
            if (!open) resetOfferForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Nueva Oferta
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nueva Oferta de Práctica</DialogTitle>
                <DialogDescription>
                  Complete los detalles de la nueva vacante para estudiantes.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateOffer} className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} placeholder="Ej. Desarrollador Web" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <select 
                    id="empresa" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={offerEmpresaId}
                    onChange={(e) => setOfferEmpresaId(e.target.value)}
                    required
                  >
                    <option value="">Seleccione una empresa</option>
                    {empresas?.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.razonSocial}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start">Fecha Inicio</Label>
                    <Input id="start" type="date" value={offerStartDate} onChange={(e) => setOfferStartDate(e.target.value)} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end">Fecha Fin</Label>
                    <Input id="end" type="date" value={offerEndDate} onChange={(e) => setOfferEndDate(e.target.value)} required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hours">Horas Requeridas</Label>
                  <Input id="hours" type="number" value={offerHours} onChange={(e) => setOfferHours(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="desc">Descripción</Label>
                  <Textarea id="desc" value={offerDescription} onChange={(e) => setOfferDescription(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="req">Requisitos</Label>
                  <Textarea id="req" value={offerRequirements} onChange={(e) => setOfferRequirements(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={crearOfertaMutation.isPending}>
                  {crearOfertaMutation.isPending ? 'Guardando...' : 'Crear Oferta'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="disponibles" className="space-y-6">
        <TabsList className={`grid w-full max-w-2xl ${['ADMIN', 'COORDINADOR'].includes(userRole) ? 'grid-cols-4' : 'grid-cols-2'}`}>
          <TabsTrigger value="disponibles">Prácticas Disponibles</TabsTrigger>
          <TabsTrigger value="mis-practicas">Mis Prácticas</TabsTrigger>
          {['ADMIN', 'COORDINADOR'].includes(userRole) && (
            <>
              <TabsTrigger value="pendientes">
                Postulaciones {pendientes && pendientes.length > 0 && (
                  <Badge variant="destructive" className="ml-2 px-1 py-0 h-4">{pendientes.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="gestion">Gestión General</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="pendientes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Postulaciones por Validar</CardTitle>
              <CardDescription>Estudiantes que han solicitado una práctica y esperan aprobación</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Fecha Postulación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendientes?.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.titulo}</TableCell>
                      <TableCell>{p.empresa.razonSocial}</TableCell>
                      <TableCell>{getEstudianteName(p)}</TableCell>
                      <TableCell>{format(new Date(p.updatedAt), "dd/MM/yyyy")}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                          onClick={() => validarPostulacionMutation.mutate({ practicaId: p.id, accion: 'APROBAR' })}
                          disabled={validarPostulacionMutation.isPending}
                        >
                          Aprobar
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => validarPostulacionMutation.mutate({ practicaId: p.id, accion: 'RECHAZAR' })}
                          disabled={validarPostulacionMutation.isPending}
                        >
                          Rechazar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pendientes?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No hay postulaciones pendientes
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disponibles" className="space-y-4">
          {loadingDisponibles ? (
            <div className="flex justify-center py-12">
              <p className="text-gray-500 animate-pulse">Cargando prácticas disponibles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practicasDisponibles?.map((practica) => {
              const badgeInfo = getEstadoBadge(practica);
              return (
                <Card key={practica.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{practica.titulo}</CardTitle>
                      <Badge variant={badgeInfo.variant}>
                        {badgeInfo.label}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Building2 className="h-4 w-4" />
                      {practica.empresa?.razonSocial || 'Empresa no especificada'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-3">{practica.descripcion}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{practica.horasRequeridas} horas requeridas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>
                          {format(new Date(practica.fechaInicio), "dd 'de' MMMM", { locale: es })} -{' '}
                          {format(new Date(practica.fechaFin), "dd 'de' MMMM, yyyy", { locale: es })}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <p className="text-xs font-semibold text-gray-700">Requisitos:</p>
                      <p className="text-xs text-gray-600">{practica.requisitos}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => postularMutation.mutate({ practicaId: practica.id })}
                      disabled={postularMutation.isPending}
                    >
                      {postularMutation.isPending ? 'Procesando...' : 'Postular ahora'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          )}
          {practicasDisponibles?.length === 0 && !loadingDisponibles && (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay prácticas disponibles en este momento</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="mis-practicas" className="space-y-4">
          {loadingMisPracticas ? (
            <div className="flex justify-center py-12">
              <p className="text-gray-500 animate-pulse">Cargando tus prácticas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {misPracticas?.map((practica) => {
                const badgeInfo = getEstadoBadge(practica);
              const progreso = calcularProgreso(practica);
              const horasRealizadas = practica.informes?.reduce((sum: number, inf: any) => sum + inf.horas, 0) || 0;
              const ultimoInforme = practica.informes && practica.informes.length > 0 
                ? practica.informes[practica.informes.length - 1] 
                : null;
              
              return (
                <Card key={practica.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{practica.titulo}</CardTitle>
                      <Badge variant={badgeInfo.variant}>
                        {badgeInfo.label}
                      </Badge>
                    </div>
                    <CardDescription>
                      {practica.empresa?.razonSocial || 'Empresa no especificada'} - 
                      Asesor: {practica.asesor?.user?.nombres || 'No asignado'} {practica.asesor?.user?.apellidos || ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Horas realizadas:</span>
                        <span className="font-semibold">
                          {horasRealizadas} / {practica.horasRequeridas}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min(progreso, 100)}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-600 mt-4">
                        <p>Informes presentados: {practica.informes?.length || 0}</p>
                        <p>Último informe: {ultimoInforme?.fecha ? 
                          format(new Date(ultimoInforme.fecha), "dd/MM/yyyy") : 'Ninguno'}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleVerInformes(practica)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Informes
                    </Button>
                    <Button 
                      variant="default" 
                      className="flex-1"
                      onClick={() => handleNuevoInforme(practica)}
                      disabled={practica.estado !== 'EN_CURSO' && practica.estado !== 'ASIGNADO'}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Nuevo Informe
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          )}
          {misPracticas?.length === 0 && !loadingMisPracticas && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aún no tienes prácticas asignadas</p>
            </div>
          )}
        </TabsContent>

        {['ADMIN', 'COORDINADOR'].includes(userRole) && (
          <TabsContent value="gestion">
            <Card>
              <CardHeader>
                <CardTitle>Administración de Prácticas</CardTitle>
                <CardDescription>Asigna asesores y supervisa el progreso de todos los estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Asesor</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todasLasPracticas?.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.titulo}</TableCell>
                        <TableCell>{p.empresa.razonSocial}</TableCell>
                        <TableCell>{getEstudianteName(p)}</TableCell>
                        <TableCell>{getAsesorName(p)}</TableCell>
                        <TableCell>
                          <Badge variant={getEstadoBadge(p).variant}>
                            {getEstadoBadge(p).label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Gestionar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Modales */}
      {selectedPractica && (
        <>
          <VerInformesModal
            practica={selectedPractica}
            open={modalInformesOpen}
            onOpenChange={setModalInformesOpen}
          />
          <NuevoInformeModal
            practicaId={selectedPractica.id}
            onSuccess={handleRefresh}
            open={modalNuevoInformeOpen}
            onOpenChange={setModalNuevoInformeOpen}
          />
        </>
      )}
    </div>
  );
}