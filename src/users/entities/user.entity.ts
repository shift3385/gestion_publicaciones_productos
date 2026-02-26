import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Profile } from './profile.entity';
import { Product } from '../../products/entities/product.entity';
import { Publication } from '../../publications/entities/publication.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  @Exclude() // Evita que se devuelva el password en las respuestas JSON
  password: string;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column('boolean', { default: true })
  isActive: boolean;

  // Relación OneToOne con Perfil
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true, eager: true })
  profile: Profile;

  // Relaciones bidireccionales para mejorar performance en búsquedas de negocio
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Publication, (publication) => publication.user)
  publications: Publication[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
