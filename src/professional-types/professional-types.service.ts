import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessionalTypeDto } from './dto/create-professional-type.dto';
import { UpdateProfessionalTypeDto } from './dto/update-professional-type.dto';
import { ProfessionalType } from './entities/professional-type.entity';

@Injectable()
export class ProfessionalTypesService {
  constructor(
    @InjectRepository(ProfessionalType)
    private professionalTypeRepository: Repository<ProfessionalType>
  ){}

  create(createProfessionalTypeDto: CreateProfessionalTypeDto) {
    return this.professionalTypeRepository.save(createProfessionalTypeDto);
  }

  findAll() {
    return this.professionalTypeRepository.find({ order: { id: -1 }});
  }

  findOne(id: number) {
    return this.professionalTypeRepository.findOne(id);
  }

  update(id: number, updateProfessionalTypeDto: UpdateProfessionalTypeDto) {
    return this.professionalTypeRepository.update(id, updateProfessionalTypeDto);
  }

  async remove(id: number) {
    let deleteResponse = await this.professionalTypeRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
