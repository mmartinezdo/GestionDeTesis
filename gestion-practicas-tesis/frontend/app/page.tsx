import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-blue-900">Gestión de Prácticas y Tesis</h1>
        <p className="text-xl text-gray-600">Bienvenido al sistema de gestión de la UNT.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button size="lg">Iniciar Sesión</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg">Registrarse</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
