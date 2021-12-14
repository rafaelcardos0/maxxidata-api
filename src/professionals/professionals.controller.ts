import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Professional } from './entities/professional.entity';

@Controller('professionals')
@ApiTags('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registra um profissional' })
  @ApiResponse({ status: 201, description: 'Profissional criado com sucesso' })
  create(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalsService.create(createProfessionalDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna todos os profissionais' })
  @ApiResponse({ status: 200, type: Professional, isArray: true, description: 'Lista de profissionais retornada com sucesso' })
  findAll() {
    return this.professionalsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna um profissional pelo id' })
  @ApiResponse({ status: 200, type: Professional, description: 'Dados de um profissional retornado com sucesso' })
  findOne(@Param('id') id: string) {
    return this.professionalsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza um profissional' })
  @ApiResponse({ status: 200, description: 'Profissional atualizado com sucesso' })
  update(@Param('id') id: string, @Body() updateProfessionalDto: UpdateProfessionalDto) {
    return this.professionalsService.update(+id, updateProfessionalDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove um profissional' })
  @ApiResponse({ status: 204, description: 'Profissional removido com sucesso' })
  remove(@Param('id') id: string) {
    return this.professionalsService.remove(+id);
  }
}
