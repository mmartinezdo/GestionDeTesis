// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si usuario existe
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: registerDto.email },
          { dni: registerDto.dni },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('El email o DNI ya está registrado');
    }

    // Hashear password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Crear usuario base
    const role = await this.prisma.roleInfo.findUnique({
      where: { nombre: registerDto.rol || 'ESTUDIANTE' }
    });

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        nombres: registerDto.nombres,
        apellidos: registerDto.apellidos,
        dni: registerDto.dni,
        rolId: role?.id,
      },
      include: { rol: true }
    });

    // Crear registro específico según rol
    if (registerDto.rol === 'ESTUDIANTE') {
      await this.prisma.estudiante.create({
        data: {
          codigo: registerDto.codigoEstudiante!,
          escuela: registerDto.escuela!,
          anioIngreso: registerDto.anioIngreso!,
          userId: user.id,
        },
      });
    } else if (registerDto.rol === 'ASESOR') {
      await this.prisma.asesor.create({
        data: {
          especialidad: registerDto.especialidad!,
          departamento: registerDto.departamento!,
          userId: user.id,
        },
      });
    }

    // Generar token
    const token = this.generateToken(user.id, user.email, user.rol?.nombre || 'ESTUDIANTE');
    
    // Omitir password del response
    const { password, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
      include: { rol: true }
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.generateToken(user.id, user.email, user.rol?.nombre || 'ESTUDIANTE');
    
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async validateUser(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        estudiante: true,
        asesor: true,
        coordinador: true,
      },
    });
  }

  private generateToken(userId: number, email: string, rol: string) {
    return this.jwtService.sign({ sub: userId, email, rol });
  }
}