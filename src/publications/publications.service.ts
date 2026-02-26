import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication, PublicationStatus } from './entities/publication.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createPublicationDto: CreatePublicationDto, user: User) {
    const { productIds, ...publicationDetails } = createPublicationDto;

    // Verificar si los productos existen
    const products = await this.productRepository.findBy({ id: In(productIds) });
    if (products.length === 0) throw new NotFoundException(`No products found for the provided IDs`);
    
    // Si no se encuentran todos los productos solicitados, lanzar error para consistencia
    if (products.length !== productIds.length) {
      throw new BadRequestException('Some products provided were not found');
    }

    // Validar Fechas (Inicio < Fin)
    if (new Date(publicationDetails.startDate) >= new Date(publicationDetails.endDate)) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la de inicio');
    }

    try {
      const publication = this.publicationRepository.create({
        ...publicationDetails,
        products, // Ahora es una lista
        user,
      });
      await this.publicationRepository.save(publication);
      return publication;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating publication');
    }
  }

  async findAll() {
    return await this.publicationRepository.find({
      relations: ['user', 'products'], // Cambiado de product a products
    });
  }

  async findOne(id: string) {
    const publication = await this.publicationRepository.findOne({
      where: { id },
      relations: ['user', 'products'], // Cambiado de product a products
    });
    if (!publication) throw new NotFoundException(`Publication with id ${id} not found`);
    return publication;
  }

  async update(id: string, updatePublicationDto: UpdatePublicationDto) {
    const { productIds, ...publicationDetails } = updatePublicationDto;

    const publication = await this.publicationRepository.preload({
      id: id,
      ...publicationDetails,
    });

    if (!publication) throw new NotFoundException(`Publication with id ${id} not found`);

    // Si se envían nuevos productos, actualizarlos
    if (productIds) {
      const products = await this.productRepository.findBy({ id: In(productIds) });
      if (products.length !== productIds.length) {
        throw new BadRequestException('Some products provided were not found');
      }
      publication.products = products;
    }

    try {
      await this.publicationRepository.save(publication);
      return publication;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error updating publication');
    }
  }

  async remove(id: string) {
    const publication = await this.findOne(id);
    await this.publicationRepository.remove(publication);
    return { deleted: true };
  }
}
