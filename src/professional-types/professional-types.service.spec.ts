import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/TestUtil';
import { ProfessionalType } from './entities/professional-type.entity';
import { ProfessionalTypesService } from './professional-types.service';

describe('ProfessionalTypesService', () => {
  let service: ProfessionalTypesService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessionalTypesService,
        {
          provide: getRepositoryToken(ProfessionalType),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<ProfessionalTypesService>(ProfessionalTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar um array de tipos de profissional', async () => {
      const professionalType = TestUtil.getValidProfessionalType();
      mockRepository.find.mockReturnValue([professionalType]);
      const professionalTypes = await service.findAll();
      
      expect(professionalTypes).toHaveLength(1);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('find', () => {
    it('deve retornar um tipo de profissional existente', async () => {
      const professionalType = TestUtil.getValidProfessionalType();
      mockRepository.findOne.mockReturnValue(professionalType);
      const professionalTypeFound = await service.findOne(professionalType.id);
      
      expect(professionalTypeFound).toMatchObject(professionalType);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('save', () => {
    it('deve criar um tipo de profissional', async () => {
      const professionalType = TestUtil.getValidProfessionalType();
      mockRepository.save.mockReturnValue(professionalType);
      const savedProfessionalType = await service.create(professionalType);
      
      expect(savedProfessionalType).toMatchObject(professionalType);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('deve atualizar um tipo de profissional', async () => {
      const professionalType = TestUtil.getValidProfessionalType();
      const updatedProfessionalType = { ...professionalType, descricao: 'Atualização' };

      mockRepository.update.mockReturnValue(updatedProfessionalType);
      const resultProfessionalType = await service.update(1, { descricao: 'Atualização' });
      
      expect(resultProfessionalType).toMatchObject(updatedProfessionalType);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('deve remover um tipo de profissional', async () => {
      const professionalType = TestUtil.getValidProfessionalType();

      mockRepository.delete.mockReturnValue({
        raw: '',
        affected: 1
      });
      const deleteResult = await service.remove(professionalType.id);
      
      expect(deleteResult).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
