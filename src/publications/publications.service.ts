import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const { productId, ...publicationDetails } = createPublicationDto;

    // Verificar si el producto existe
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException(`Product with id ${productId} not found`);

    // Validar Fechas (Inicio < Fin)
    if (new Date(publicationDetails.startDate) >= new Date(publicationDetails.endDate)) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la de inicio');
    }

    try {
      const publication = this.publicationRepository.create({
        ...publicationDetails,
        product,
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
      relations: ['user', 'product'],
    });
  }

  async findOne(id: string) {
    const publication = await this.publicationRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (!publication) throw new NotFoundException(`Publication with id ${id} not found`);
    return publication;
  }

  update(id: string, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: string) {
    return `This action removes a #${id} publication`;
  }
}
