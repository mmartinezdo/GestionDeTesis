'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Link from 'next/link';

const registerSchema = z.object({
  nombres: z.string().min(2, 'Nombres requeridos'),
  apellidos: z.string().min(2, 'Apellidos requeridos'),
  email: z.string().email('Email inválido'),
  dni: z.string().length(8, 'DNI debe tener 8 dígitos'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rol: z.enum(['ESTUDIANTE', 'ASESOR', 'COORDINADOR', 'ADMIN']),
  codigoEstudiante: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  
  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success('Registro exitoso');
      router.push('/login');
    },
    onError: (error) => {
      toast.error('Error al registrarse: ' + error.message);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      rol: 'ESTUDIANTE',
    }
  });

  const rol = watch('rol');

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data as any, {
      onSuccess: () => {
        toast.success('Registro exitoso');
        router.push('/login');
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <Card className="w-[450px] shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Registro de Usuario</CardTitle>
          <CardDescription className="text-center">
            Crea tu cuenta en el Sistema UNT
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }} 
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres</Label>
                <Input id="nombres" {...register('nombres')} />
                {errors.nombres && <p className="text-xs text-red-500">{errors.nombres.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input id="apellidos" {...register('apellidos')} />
                {errors.apellidos && <p className="text-xs text-red-500">{errors.apellidos.message}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dni">DNI</Label>
                <Input id="dni" {...register('dni')} />
                {errors.dni && <p className="text-xs text-red-500">{errors.dni.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" {...register('password')} />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rol">Rol</Label>
              <select 
                {...register('rol')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="rol"
              >
                <option value="ESTUDIANTE">ESTUDIANTE</option>
                <option value="ASESOR">ASESOR</option>
                <option value="COORDINADOR">COORDINADOR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              {errors.rol && <p className="text-xs text-red-500">{errors.rol.message}</p>}
            </div>

            {rol === 'ESTUDIANTE' && (
              <div className="space-y-2">
                <Label htmlFor="codigoEstudiante">Código de Estudiante</Label>
                <Input id="codigoEstudiante" {...register('codigoEstudiante')} name="codigoEstudiante" />
                {errors.codigoEstudiante && <p className="text-xs text-red-500">{errors.codigoEstudiante.message}</p>}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'Registrando...' : 'Registrarse'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="text-blue-600 hover:underline">
              ¿Ya tienes cuenta? Inicia sesión aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
