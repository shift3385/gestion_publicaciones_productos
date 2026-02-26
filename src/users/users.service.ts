import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, fullName, ...userData } = createUserDto;

      // Creamos el perfil (TypeORM se encargará de guardarlo por el cascade: true)
      const profile = new Profile();
      profile.fullName = fullName;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10), // Encriptar password
        profile, // Asignar el perfil al usuario
      });

      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') // Código de error de Postgres para registro duplicado
        throw new BadRequestException(error.detail);
      
      console.log(error);
      throw new InternalServerErrorException('Check server logs');
    }
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['profile'] });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['profile'] });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, fullName, ...userData } = updateUserDto;

    // Preload no maneja relaciones de forma tan sencilla con cascade
    // Así que lo haremos manual para asegurar que el perfil se actualice si viene fullName
    const user = await this.findOne(id);

    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }

    if (fullName) {
      user.profile.fullName = fullName;
    }

    // Copiar otras propiedades de userData
    Object.assign(user, userData);

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { deleted: true };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    
    console.log(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
