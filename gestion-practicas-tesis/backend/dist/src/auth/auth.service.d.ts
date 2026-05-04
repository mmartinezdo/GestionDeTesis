import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            rol: {
                id: number;
                nombre: string;
                descripcion: string | null;
                createdAt: Date;
            };
            id: number;
            createdAt: Date;
            rolId: number | null;
            updatedAt: Date;
            email: string;
            dni: string;
            nombres: string;
            apellidos: string;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            rol: {
                id: number;
                nombre: string;
                descripcion: string | null;
                createdAt: Date;
            };
            id: number;
            createdAt: Date;
            rolId: number | null;
            updatedAt: Date;
            email: string;
            dni: string;
            nombres: string;
            apellidos: string;
        };
        token: string;
    }>;
    validateUser(userId: number): Promise<{
        estudiante: {
            id: number;
            direccion: string | null;
            telefono: string | null;
            codigo: string;
            escuela: string;
            anioIngreso: number;
            userId: number;
        };
        asesor: {
            id: number;
            userId: number;
            especialidad: string;
            departamento: string;
        };
        coordinador: {
            id: number;
            userId: number;
            facultad: string;
        };
    } & {
        id: number;
        createdAt: Date;
        rolId: number | null;
        updatedAt: Date;
        email: string;
        dni: string;
        password: string;
        nombres: string;
        apellidos: string;
    }>;
    private generateToken;
}
