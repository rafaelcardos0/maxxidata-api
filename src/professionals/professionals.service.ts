import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Professional } from './entities/professional.entity';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>
  ){}

  create(createProfessionalDto: CreateProfessionalDto) {
    return this.professionalRepository.save(createProfessionalDto);
  }

  findAll() {
    return this.professionalRepository.find({ relations: ['professionalType'], order: { id: -1 }});
  }

  findOne(id: number) {
    return this.professionalRepository.findOne(id);
  }

  update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
    return this.professionalRepository.update(id, updateProfessionalDto);
  }

  async remove(id: number) {
    let deleteResponse = await this.professionalRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
