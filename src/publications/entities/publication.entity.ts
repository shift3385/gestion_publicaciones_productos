import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

export enum PublicationStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

@Entity('publications')
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' }) // Usamos timestamptz para fechas exactas con zona horaria
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: PublicationStatus,
    default: PublicationStatus.DRAFT,
  })
  status: PublicationStatus;

  // Relación con el Usuario (Quién publica)
  @ManyToOne(() => User, (user) => user.publications, { eager: true })
  user: User;

  // Relación con los Productos (Qué se publica)
  @ManyToMany(() => Product, { eager: true })
  @JoinTable() // Esta anotación crea la tabla intermedia automáticamente
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
