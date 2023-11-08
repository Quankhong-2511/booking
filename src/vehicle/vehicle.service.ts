import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { UpdateVehicelDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  findAll() {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoin('vehicle.user', 'user')
      .select([
        'vehicle.vehicleId',
        'vehicle.type',
        'vehicle.licensePlate',
        'vehicle.seats',
        'vehicle.status',
        'user.username',
        'user.fullname'
      ])
      .orderBy('vehicle.vehicleId', 'ASC')
      .getMany();
  }

  async findOne(vehicleId: number): Promise<Vehicle | { message: string }> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { vehicleId },
    });
    if (!vehicle) {
      return { message: 'Không tìm thấy thông tin xe' };
    }
    return vehicle;
  }

  async findReady() {
    return this.vehicleRepository.find({
      where: { status: 'Ready' },
    });
  }

  async findBusy() {
    return this.vehicleRepository.find({
      where: { status: 'Busy' },
    });
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return await this.vehicleRepository.save(
      this.vehicleRepository.create(createVehicleDto),
    );
  }

  async update(
    vehicleId: number,
    updateVehicleDto: UpdateVehicelDto,
  ): Promise<UpdateResult> {
    return await this.vehicleRepository.update(vehicleId, updateVehicleDto);
  }

  async delete(vehicleId: number) {
    return await this.vehicleRepository.delete({ vehicleId: vehicleId });
  }
}
