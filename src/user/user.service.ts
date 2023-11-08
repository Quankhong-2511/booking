import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon from 'argon2';
import { UpdateUserDto } from './dto/update-user.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-option';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // findManyWithPagination(
  //   paginationOptions: IPaginationOptions,
  // ): Promise<User[]> {
  //   return this.userRepository.find({
  //     skip: (paginationOptions.page - 1) * paginationOptions.limit,
  //     take: paginationOptions.limit,
  //   })
  // }

  async findAll(paginationOptions: IPaginationOptions) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.vehicle', 'vehicle')
      .leftJoinAndSelect('user.role', 'role')
      .orderBy('user.createAt', 'ASC')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .getManyAndCount();
  }

  async findOne(userId: number): Promise<User | { message: string }> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.vehicle', 'vehicle')
      .where('user.userId = :userId', { userId })
      .getOne();
    if (!user) {
      return { message: 'Không có người dùng này' };
    }
    return user;
  }

  async findByVehicle() {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hassPassword = await argon.hash(createUserDto.password);
    createUserDto.password = hassPassword;
    return this.userRepository.save(this.userRepository.create(createUserDto));
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(userId, updateUserDto);
  }

  async delete(userId: number): Promise<DeleteResult> {
    return await this.userRepository.delete({ userId: userId });
  }

  async uploadAvatar(userid: number, avatar: string): Promise<UpdateResult> {
    return await this.userRepository.update(userid, { avatar });
  }
}
