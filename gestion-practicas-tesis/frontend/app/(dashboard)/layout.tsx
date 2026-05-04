'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Briefcase, FileBarChart, LogOut, Users, Building2, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Estudiantes', href: '/estudiantes', icon: Users },
  { name: 'Empresas', href: '/empresas', icon: Building2 },
  { name: 'Prácticas', href: '/practicas', icon: Briefcase },
  { name: 'Tesis', href: '/tesis', icon: GraduationCap },
  { name: 'Reportes', href: '/reportes', icon: FileBarChart },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Sesión cerrada correctamente');
    router.push('/login');
  };

  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
  const userRole = user.rol || 'INVITADO';

  const filteredNavigation = navigation.filter(item => {
    if (userRole === 'ADMIN') return true;
    if (userRole === 'ESTUDIANTE') return ['Dashboard', 'Prácticas', 'Tesis', 'Reportes'].includes(item.name);
    if (userRole === 'ASESOR') return ['Dashboard', 'Prácticas', 'Tesis', 'Reportes'].includes(item.name);
    if (userRole === 'COORDINADOR') return ['Dashboard', 'Estudiantes', 'Empresas', 'Prácticas', 'Tesis', 'Reportes'].includes(item.name);
    return item.name === 'Dashboard';
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r shadow-sm">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-2">
              <span className="text-xl font-bold text-blue-900">Sistema UNT</span>
            </div>
            <div className="px-4 mb-8">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Rol: {userRole}
              </span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {filteredNavigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-5 w-5'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
