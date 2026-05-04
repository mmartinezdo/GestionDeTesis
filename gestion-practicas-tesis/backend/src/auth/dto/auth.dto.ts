// backend/src/auth/dto/auth.dto.ts
import { IsEmail, IsString, MinLength, IsEnum, IsOptional, IsInt, Min } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  dni: string;

  @IsEnum(Role)
  rol: Role;

  // Campos específicos para estudiante
  @IsOptional()
  @IsString()
  codigoEstudiante?: string;

  @IsOptional()
  @IsString()
  escuela?: string;

  @IsOptional()
  @IsInt()
  @Min(2000)
  anioIngreso?: number;

  // Campos específicos para asesor
  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsString()
  departamento?: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}