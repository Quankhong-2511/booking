import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { StatusVehicle } from "src/enums/statusVehicle.enum";
import { User } from "src/user/entities/user.entity";

export class UpdateVehicelDto {
    @IsOptional()
    @ApiProperty()
    type: string;

    @ApiProperty()
    @IsOptional()
    licensePlate: string;

    @ApiProperty()
    @IsOptional()
    seats: number;

    @ApiProperty()
    @IsOptional()
    @IsEnum(StatusVehicle)
    status: string;

 
}
