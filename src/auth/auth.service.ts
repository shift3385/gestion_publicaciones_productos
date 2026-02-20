import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // 1. Buscar el usuario en la DB (pero necesitamos traer el password)
    // Nota: Por defecto el password está excluido, tenemos que buscarlo explícitamente
    const user = await (this.usersService as any).userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'fullName', 'roles', 'isActive']
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas (email)');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('El usuario no está activo');
    }

    // 2. Comparar el password (el que nos mandan vs el hash de la DB)
    // IMPORTANTE: Por ahora tus usuarios de prueba tienen '123' en texto plano.
    // El AuthService espera un hash, pero si no detecta hash, comparará texto plano.
    const isMatch = bcrypt.compareSync(password, user.password) || password === user.password;

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales no válidas (password)');
    }

    // 3. Generar el JWT
    const payload = { id: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roles: user.roles
      }
    };
  }
}
