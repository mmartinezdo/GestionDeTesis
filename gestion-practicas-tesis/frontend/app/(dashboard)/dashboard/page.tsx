// frontend/app/(dashboard)/dashboard/page.tsx
'use client';

import { trpc } from '@/lib/trpc/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Briefcase, FileText, Building2, TrendingUp, Calendar } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function DashboardPage() {
  const { data: estadisticas, isLoading } = trpc.dashboard.getEstadisticas.useQuery();
  const { data: topEmpresas } = trpc.dashboard.getTopEmpresas.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const role = estadisticas?.role;

  const getCardsData = () => {
    if (role === 'ADMIN' || role === 'COORDINADOR') {
      return [
        { title: 'Estudiantes', value: estadisticas?.totalEstudiantes || 0, icon: Users, color: 'bg-blue-500' },
        { title: 'Prácticas Activas', value: estadisticas?.totalPracticasActivas || 0, icon: Briefcase, color: 'bg-green-500' },
        { title: 'Tesis en Curso', value: estadisticas?.totalTesisEnCurso || 0, icon: FileText, color: 'bg-purple-500' },
        { title: 'Empresas Convenio', value: estadisticas?.totalEmpresasConvenio || 0, icon: Building2, color: 'bg-orange-500' },
      ];
    }
    if (role === 'ESTUDIANTE') {
      return [
        { title: 'Mis Postulaciones', value: estadisticas?.totalMisPracticas || 0, icon: Briefcase, color: 'bg-blue-500' },
        { title: 'Prácticas Activas', value: estadisticas?.practicasActivas || 0, icon: TrendingUp, color: 'bg-green-500' },
        { title: 'Mis Tesis', value: estadisticas?.totalMisTesis || 0, icon: FileText, color: 'bg-purple-500' },
        { title: 'Tesis Activas', value: estadisticas?.tesisActivas || 0, icon: Calendar, color: 'bg-orange-500' },
      ];
    }
    if (role === 'ASESOR') {
      return [
        { title: 'Prácticas Asesoradas', value: estadisticas?.totalPracticasAsesoradas || 0, icon: Briefcase, color: 'bg-blue-500' },
        { title: 'En Curso', value: estadisticas?.practicasEnCurso || 0, icon: TrendingUp, color: 'bg-green-500' },
        { title: 'Tesis Asesoradas', value: estadisticas?.totalTesisAsesoradas || 0, icon: FileText, color: 'bg-purple-500' },
        { title: 'En Desarrollo', value: estadisticas?.tesisEnDesarrollo || 0, icon: Calendar, color: 'bg-orange-500' },
      ];
    }
    return [];
  };

  const cardsData = getCardsData();

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Bienvenido al sistema de gestión de prácticas y tesis</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Actualizado: {new Date().toLocaleDateString('es-PE')}</span>
        </div>
      </div>

      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardsData.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {card.title}
              </CardTitle>
              <div className={`${card.color} p-2 rounded-full text-white`}>
                <card.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-gray-500 mt-1">
                Datos actualizados en tiempo real
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prácticas por estado */}
        <Card>
          <CardHeader>
            <CardTitle>{role === 'ESTUDIANTE' ? 'Mis Prácticas' : 'Prácticas'} por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={estadisticas?.practicasPorEstado}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="estado" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#8884d8" name="Cantidad" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tesis por estado - Gráfico circular */}
        <Card>
          <CardHeader>
            <CardTitle>{role === 'ESTUDIANTE' ? 'Mis Tesis' : 'Tesis'} por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={estadisticas?.tesisPorEstado}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cantidad"
                  nameKey="estado"
                >
                  {estadisticas?.tesisPorEstado?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top empresas (Solo Admin/Coordinador) */}
        {(role === 'ADMIN' || role === 'COORDINADOR') && topEmpresas && topEmpresas.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top 5 Empresas con más Prácticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEmpresas.map((empresa: any, index: number) => (
                  <div key={empresa.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-lg text-gray-600">#{index + 1}</div>
                      <div>
                        <p className="font-semibold">{empresa.razonSocial}</p>
                        <p className="text-sm text-gray-500">RUC: {empresa.ruc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{empresa._count.practicas}</p>
                      <p className="text-xs text-gray-500">prácticas</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}