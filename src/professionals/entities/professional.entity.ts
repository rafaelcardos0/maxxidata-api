import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ProfessionalType } from '../../professional-types/entities/professional-type.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Professional {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  nome: string;

  @Column()
  @ApiProperty()
  telefone: string;

  @Column()
  @ApiProperty()
  email: string;

  @ApiProperty({ type: 'number' })
  @Column({ name: 'tipoDeProfissional' })
  tipoDeProfissional: Number;

  @ManyToOne(type => ProfessionalType)
  @JoinColumn({ name: 'tipoDeProfissional' })
  professionalType: ProfessionalType;

  @Column({ default: true })
  @ApiProperty()
  situacao: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}