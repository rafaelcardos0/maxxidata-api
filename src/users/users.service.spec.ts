import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/TestUtil';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  
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
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar um array de usuários', async () => {
      const user = TestUtil.getValidUser();
      mockRepository.find.mockReturnValue([user]);
      const users = await service.findAll();

      expect(users).toHaveLength(1);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('find', () => {
    it('deve retornar um usuário existente pelo id', async () => {
      const user = TestUtil.getValidUser();
      mockRepository.findOne.mockReturnValue(user);
      const userFound = await service.findOne(user.id);

      expect(userFound).toMatchObject(user);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByUsername', () => {
    it('deve retornar um usuário existente pelo username', async () => {
      const user = TestUtil.getValidUser();
      mockRepository.findOne.mockReturnValue({
        id: user.id,
        username: user.username,
        password: user.password,
        isActive: user.isActive
      });
      const userFound = await service.findByUsername(user.username);
      
      expect(userFound.username).toBe(user.username);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(2);
    });
  });

  describe('save', () => {
    it('deve criar um usuário', async () => {
      const user = TestUtil.getValidUser();
      mockRepository.save.mockReturnValue(user);
      const savedUser = await service.create(user);
      
      expect(savedUser).toMatchObject(user);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário', async () => {
      const user = TestUtil.getValidUser();
      const updatedUser = { ...user, name: 'Fulano' };

      mockRepository.update.mockReturnValue(updatedUser);
      const resultUser = await service.update(1, { name: 'Fulano' });
      
      expect(resultUser).toMatchObject(updatedUser);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('deve remover um usuário', async () => {
      const user = TestUtil.getValidUser();

      mockRepository.delete.mockReturnValue({
        raw: '',
        affected: 1
      });
      const deleteResult = await service.remove(user.id);
      
      expect(deleteResult).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
