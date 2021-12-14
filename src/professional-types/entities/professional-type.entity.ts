import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Professional } from '../../professionals/entities/professional.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProfessionalType {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  descricao: string;

  @OneToMany(type => Professional, professional => professional.tipoDeProfissional)
  profissionais: Professional;

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