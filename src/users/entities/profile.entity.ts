import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  avatarUrl?: string;

  // Relación OneToOne con User
  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn() // Importante: el JoinColumn va en la clase que posee la FK
  user: User;
}
