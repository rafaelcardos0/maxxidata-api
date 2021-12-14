import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfessionalType } from './entities/professional-type.entity';
import { ProfessionalTypesController } from './professional-types.controller';
import { ProfessionalTypesService } from './professional-types.service';

describe('ProfessionalTypesController', () => {
  let controller: ProfessionalTypesController;
  let service: ProfessionalTypesService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalTypesController],
      providers: [
        ProfessionalTypesService,
        {
          provide: getRepositoryToken(ProfessionalType),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<ProfessionalTypesService>(ProfessionalTypesService);
    controller = module.get<ProfessionalTypesController>(ProfessionalTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
