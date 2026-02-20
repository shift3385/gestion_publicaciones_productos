import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10), // Encriptar password
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
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, ...userData } = updateUserDto;

    const user = await this.userRepository.preload({
      id: id,
      ...userData,
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }

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
