import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalTypesService } from './professional-types.service';
import { CreateProfessionalTypeDto } from './dto/create-professional-type.dto';
import { UpdateProfessionalTypeDto } from './dto/update-professional-type.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfessionalType } from './entities/professional-type.entity';

@Controller('professional-types')
@ApiTags('professional-types')
export class ProfessionalTypesController {
  constructor(private readonly professionalTypesService: ProfessionalTypesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registra um tipo de profissional' })
  @ApiResponse({ status: 201, description: 'Tipo de profissional criado com sucesso' })
  create(@Body() createProfessionalTypeDto: CreateProfessionalTypeDto) {
    return this.professionalTypesService.create(createProfessionalTypeDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna todos os tipos de profissional' })
  @ApiResponse({ status: 200, type: ProfessionalType, isArray: true, description: 'Lista de tipos de profissional retornada com sucesso' })
  findAll() {
    return this.professionalTypesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna um tipo de profissional pelo id' })
  @ApiResponse({ status: 200, type: ProfessionalType, description: 'Dados de um tipo de profissional retornado com sucesso' })
  findOne(@Param('id') id: string) {
    return this.professionalTypesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza um tipo de profissional' })
  @ApiResponse({ status: 200, description: 'Tipo de profissional atualizado com sucesso' })
  update(@Param('id') id: string, @Body() updateProfessionalTypeDto: UpdateProfessionalTypeDto) {
    return this.professionalTypesService.update(+id, updateProfessionalTypeDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove um tipo de profissional' })
  @ApiResponse({ status: 204, description: 'Tipo de profissional removido com sucesso' })
  remove(@Param('id') id: string) {
    return this.professionalTypesService.remove(+id);
  }
}
