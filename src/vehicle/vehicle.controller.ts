import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateVehicelDto } from './dto/update-vehicle.dto';

@ApiBearerAuth()
@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get('/')
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get('/:vehicleId')
  async findOne(
    @Param('vehicleId') vehicleId: number,
  ): Promise<Vehicle | { message: string }> {
    return await this.vehicleService.findOne(vehicleId);
  }

  @Get('status/ready')
  async findReady() {
    return this.vehicleService.findReady();
  }

  @Get('status/busy')
  async findBusy() {
    return this.vehicleService.findBusy();
  }

  @Post('/')
  createVehicle(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleService.create(createVehicleDto);
  }

  @Patch('/:vehicleId')
  async update(
    @Param('vehicleId') vehicleId: number,
    @Body() updateVehicleDto: UpdateVehicelDto,
  ) {
    const updateVehicle = await this.vehicleService.update(
      vehicleId,
      updateVehicleDto,
    );
    return { message: 'Sửa thông tin xe thành công' };
  }

  @Delete('/:vehicleId')
  delete(@Param('vehicleId') vehicleId: number) {
    const deleteVehicle = this.vehicleService.delete(vehicleId);
    return { message: 'Xóa thành công', vehicle: deleteVehicle };
  }
}
