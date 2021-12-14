import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { ProfessionalsController } from './professionals.controller';
import { ProfessionalsService } from './professionals.service';

describe('ProfessionalsController', () => {
  let controller: ProfessionalsController;
  let service: ProfessionalsService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalsController],
      providers: [
        ProfessionalsService,
        {
          provide: getRepositoryToken(Professional),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<ProfessionalsService>(ProfessionalsService);
    controller = module.get<ProfessionalsController>(ProfessionalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
