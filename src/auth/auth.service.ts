import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });
    if (!user) {
      throw new HttpException(
        'Tài khoản không tồn tại',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const checkPass = await argon2.verify(user.password, loginUserDto.password);
    if (!checkPass) {
      throw new HttpException(
        'Mật khẩu không hợp lệ, vui lòng liên hệ Admin hệ thống',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = {userId:user.userId, username:user.username};
    return this.generateToken(payload)
  }

  async refreshToken(refreshToken:string): Promise<any> {
    try {
        const verify = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.get<string>('SECRET'),
        })
        const checkExistToken = await this.userRepository.findOneBy({username:verify.username, refreshToken})
        if(checkExistToken) {
            return this.generateToken({userId: verify.userId, username: verify.username})
        } else {
            throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST)
        }
    } catch (error) {
        throw new HttpException('Refresh Token is not valid', HttpStatus.BAD_REQUEST)
    }
  }

  private async generateToken(payload: {userId: number, username: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
        secret:this.configService.get<string>('SECRET'),
        expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN')
    })
    await this.userRepository.update(
        {username: payload.username},
        {refreshToken:refresh_token}
    )
    return{access_token, refresh_token}
  }


  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
  
  }

}
