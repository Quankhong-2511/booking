import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';
import { UserRole } from 'src/enums/user.enum';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

export class CreateUserDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty({message: 'Vui lòng chọn loại tài khoản'})
  @IsEnum(UserRole, {
    message: 'Kiểu tài khoản phải thuộc: Admin, Phong Ban, HCSN, BGD',
  })
  typeAccount: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vui lòng nhập tên tài khoản' })
  @Matches(/^((09|03|07|08)\d{8}|(84|(\+84))\d{9})$/, {
    message: 'Username không hợp lệ',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
  @Matches(/^[0-9]{6}$/, {
    message: 'Mật khẩu phải là chuỗi số và có đúng 6 ký',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vui lòng nhập lại mật khẩu' })
  confirmPassword: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Vui lòng nhập họ và tên' })
  @Length(3, 255, {message: 'Tên phải có ít nhất 3 kí tự'})
  fullname: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  department?: string;

  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  vehicle?: Vehicle;
}
