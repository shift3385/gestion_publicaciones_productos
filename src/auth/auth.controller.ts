import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiResponse({ status: 201, description: 'Login exitoso, devuelve el token y datos del usuario' })
  @ApiResponse({ status: 401, description: 'Credenciales no válidas' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Consultar perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil obtenido con éxito', type: User })
  @ApiResponse({ status: 401, description: 'Token no válido o no proporcionado' })
  getProfile(@GetUser() user: User) {
    return user;
  }
}
