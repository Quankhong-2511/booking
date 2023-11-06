import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsEmpty, IsOptional } from "class-validator";
import { StatusVehicle } from "src/enums/statusVehicle.enum";
import { User } from "src/user/entities/user.entity";

export class CreateVehicleDto {
    vehicleId: number;
    
    @ApiProperty()
    @IsNotEmpty({message: 'Vui lòng nhập Loại xe công'})
    type: string;
    
    @ApiProperty()
    @IsNotEmpty({message: "Vui lòng nhập biển số xe"})
    licensePlate: string;

    @ApiProperty()
    seats: number;

    @ApiProperty()
    @IsOptional()
    @IsEnum(StatusVehicle)
    status: string;


}