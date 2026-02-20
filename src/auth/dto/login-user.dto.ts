import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user1@test.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123', description: 'Contraseña del usuario (mínimo 3 caracteres)' })
  @IsString()
  @MinLength(3)
  password: string;
}
