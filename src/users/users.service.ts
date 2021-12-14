import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'src/common/seeder';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){
    new Seeder(this.userRepository, [
      {
        name: 'Administrador',
        username: 'admin',
        password: bcrypt.hashSync('admin21', 10), 
        isActive: true
      }
    ]);
  }

  create(createUserDto: CreateUserDto) {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find({ order: {id: -1}});
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({ select: ['id', 'username', 'password', 'isActive'], where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<boolean> {
    let deleteResponse = await this.userRepository.delete(id);
    return !!deleteResponse.affected;
  }
}
