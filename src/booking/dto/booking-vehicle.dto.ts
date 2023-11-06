import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

export class BookingVehicleDto {
  @ApiProperty({example: 1})
  @IsNotEmpty({ message: 'Vui lòng nhập Xe công' })
  vehicle?: Vehicle;

  @ApiProperty({example: 'Khong Quan'})
  @IsNotEmpty({ message: 'Vui lòng nhập Họ và tên người đề nghị' })
  owner: string;

  @ApiProperty({example: 'Phong Ban'})
  @IsNotEmpty({ message: 'Vui lòng nhập Phòng Ban' })
  department: string;

  @ApiProperty({example: 'Di cong tac'})
  @IsNotEmpty({ message: 'Vui lòng nhập Lý do đặt xe' })
  reason: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vui lòng nhập Thời gian đi dự kiến' })
  timeStart: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vui lòng nhập Thời gian về dự kiến' })
  timeEnd: Date;

  @ApiProperty({example: 'Ha Noi'})
  @IsNotEmpty({ message: 'Vui lòng nhập Điểm xuất phát' })
  from: string;

  @ApiProperty({example: 'HCM'})
  @IsNotEmpty({ message: 'Vui lòng nhập Điểm đến' })
  to: string;

  @ApiProperty({example: 5})
  @IsNotEmpty({ message: 'Vui lòng nhập Số người đi' })
  numberOfPeople: number;

  @ApiProperty({example: 'Khong Quan'})
  @IsNotEmpty({ message: 'Vui lòng nhập Chức danh người đi' })
  positionOfPerson: string;
  
  @IsOptional()
  statusBooking?: string;

  @IsOptional()
  statusTrip?: string;

  @ApiProperty({example: 'Province'})
  @IsNotEmpty({ message: 'Vui lòng nhập Khu vực' })
  area: string;

  createAt: Date;

  updateAt: Date;
}
