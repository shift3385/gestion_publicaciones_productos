import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { Publication } from './entities/publication.entity';

@ApiTags('Publicaciones')
@ApiBearerAuth()
@Controller('publications')
@UseGuards(AuthGuard())
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una publicación con múltiples productos' })
  @ApiResponse({ status: 201, description: 'Publicación creada exitosamente', type: Publication })
  create(
    @Body() createPublicationDto: CreatePublicationDto,
    @GetUser() user: User,
  ) {
    return this.publicationsService.create(createPublicationDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las publicaciones' })
  findAll() {
    return this.publicationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de una publicación por ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.publicationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una publicación (incluyendo sus productos)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.update(id, updatePublicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una publicación' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.publicationsService.remove(id);
  }
}
