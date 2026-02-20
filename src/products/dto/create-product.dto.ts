import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsOptional, IsInt, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Silla de Oficina', description: 'Nombre único del producto' })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({ example: 150.00, description: 'Precio del producto (mayor a cero)', required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 'Silla muy cómoda', description: 'Descripción detallada', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'silla_oficina', description: 'Slug único para URL (opcional)', required: false })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ example: 10, description: 'Cantidad en almacén', required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;
}
