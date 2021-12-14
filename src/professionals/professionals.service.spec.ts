import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/TestUtil';
import { Professional } from './entities/professional.entity';
import { ProfessionalsService } from './professionals.service';

describe('ProfessionalsService', () => {
  let service: ProfessionalsService;

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
        ProfessionalsService,
        {
          provide: getRepositoryToken(Professional),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<ProfessionalsService>(ProfessionalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar um array de profissionais', async () => {
      const professional = TestUtil.getValidProfessional();
      mockRepository.find.mockReturnValue([professional]);
      const professionals = await service.findAll();
      
      expect(professionals).toHaveLength(1);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('find', () => {
    it('deve retornar um profissional existente', async () => {
      const professional = TestUtil.getValidProfessional();
      mockRepository.findOne.mockReturnValue(professional);
      const professionalFound = await service.findOne(professional.id);
      
      expect(professionalFound).toMatchObject(professional);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('save', () => {
    it('deve criar um profissional', async () => {
      const professional = TestUtil.getValidProfessional();
      mockRepository.save.mockReturnValue(professional);
      const savedProfessional = await service.create(professional);
      
      expect(savedProfessional).toMatchObject(professional);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('deve atualizar um profissional', async () => {
      const professional = TestUtil.getValidProfessional();
      const updatedProfessional = { ...professional, nome: 'Fulano' };

      mockRepository.update.mockReturnValue(updatedProfessional);
      const resultProfessional = await service.update(1, { nome: 'Fulano' });
      
      expect(resultProfessional).toMatchObject(updatedProfessional);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('deve remover um profissional', async () => {
      const professional = TestUtil.getValidProfessional();

      mockRepository.delete.mockReturnValue({
        raw: '',
        affected: 1
      });
      const deleteResult = await service.remove(professional.id);
      
      expect(deleteResult).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
