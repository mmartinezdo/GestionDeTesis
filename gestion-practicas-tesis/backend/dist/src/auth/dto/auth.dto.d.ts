import { Role } from '@prisma/client';
export declare class RegisterDto {
    email: string;
    password: string;
    nombres: string;
    apellidos: string;
    dni: string;
    rol: Role;
    codigoEstudiante?: string;
    escuela?: string;
    anioIngreso?: number;
    especialidad?: string;
    departamento?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
