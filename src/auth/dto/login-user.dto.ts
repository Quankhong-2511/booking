import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class LoginUserDto {
  @ApiProperty({example: '0345678901'})
  @IsNotEmpty({ message: 'Vui lòng nhập Username' })
  @Matches(/^((09|03|07|08)\d{8}|(84|(\+84))\d{9})$/, {
    message: 'Username không hợp lệ',
  })
  username: string;

  @ApiProperty({example: '123456'})
  @IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
  @Matches(/^[0-9]{6}$/, {
    message: 'Mật khẩu không hợp lệ, vui lòng liên hệ Admin hệ thống',
  })
  password: string;
}
