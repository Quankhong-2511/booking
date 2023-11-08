import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { async } from 'rxjs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    try {
      const login = await this.authService.login(loginUserDto)
      return login
    } catch (error) {
      throw new HttpException('Tên đăng nhập hoặc mật khẩu không đúng', HttpStatus.UNAUTHORIZED)
    }
   
  }

  @Post('/refresh-token')
  refreshToken(@Body() { refresh_token }): Promise<any> {
    return this.authService.refreshToken(refresh_token);
  }

  @Post('/logout')
  async logout(){}

  @Post('/forgotPassword')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto):Promise<any> {

  }

  @Post('/resetPassword')
  async resetPassword() {}
}
