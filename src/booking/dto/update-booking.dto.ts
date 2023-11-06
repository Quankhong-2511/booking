import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Vehicle } from "src/vehicle/entities/vehicle.entity";

export class UpdateBookingDto {
    @IsOptional()
    @ApiProperty({example: 1})
    @IsNotEmpty({ message: 'Vui lòng nhập Xe công' })
    vehicle?: Vehicle;
    
    @IsOptional()
    @ApiProperty({example: 'Khong Quan'})
    @IsNotEmpty({ message: 'Vui lòng nhập Họ và tên người đề nghị' })
    owner: string;
    
    @IsOptional()
    @ApiProperty({example: 'Phong Ban'})
    @IsNotEmpty({ message: 'Vui lòng nhập Phòng Ban' })
    department: string;
    
    @IsOptional()
    @ApiProperty({example: 'Di cong tac'})
    @IsNotEmpty({ message: 'Vui lòng nhập Lý do đặt xe' })
    reason: string;
    
    @IsOptional()
    @ApiProperty()
    @IsNotEmpty({ message: 'Vui lòng nhập Thời gian đi dự kiến' })
    timeStart: Date;
    
    @IsOptional()
    @ApiProperty()
    @IsNotEmpty({ message: 'Vui lòng nhập Thời gian về dự kiến' })
    timeEnd: Date;
    
    @IsOptional()
    @ApiProperty({example: 'Ha Noi'})
    @IsNotEmpty({ message: 'Vui lòng nhập Điểm xuất phát' })
    from: string;
    
    @IsOptional()
    @ApiProperty({example: 'HCM'})
    @IsNotEmpty({ message: 'Vui lòng nhập Điểm đến' })
    to: string;
    
    @IsOptional()
    @ApiProperty({example: 5})
    @IsNotEmpty({ message: 'Vui lòng nhập Số người đi' })
    numberOfPeople: number;
    
    @IsOptional()
    @ApiProperty({example: 'Khong Quan'})
    @IsNotEmpty({ message: 'Vui lòng nhập Chức danh người đi' })
    positionOfPerson: string;
    
    @IsOptional()
    @ApiProperty()
    statusBooking?: string;
  
    @IsOptional()
    @ApiProperty()
    statusTrip?: string;
    
    @IsOptional()
    @ApiProperty({example: 'Province'})
    @IsNotEmpty({ message: 'Vui lòng nhập Khu vực' })
    area: string;
  
}