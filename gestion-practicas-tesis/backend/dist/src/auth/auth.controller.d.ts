import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}
