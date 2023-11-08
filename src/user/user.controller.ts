import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Patch,
  NotFoundException,
  Delete,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  DefaultValuePipe,
  ParseIntPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { storageConfig } from 'helpers/config';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result';
import { infinityPagination } from 'src/utils/validators/infinity-pagination';



@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Roles(RoleEnum.admin)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.userService.findAll({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Get('/:userId')
  async findOne(
    @Param('userId') userId: number,
  ): Promise<User | { message: string }> {
    return await this.userService.findOne(userId);
  }

  @UseGuards(RolesGuard)
  @Post('/')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Patch('/:userId')
  update(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updateUser = this.userService.update(userId, updateUserDto);
    return { message: 'Sửa thành công', user: updateUser };
  }

  @Delete('/:userId')
  async delete(@Param('userId') userId: number) {
    const deleteUser = this.userService.delete(userId);
    return { message: 'Xóa thành công' };
  }

  @Post('upload-avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageConfig('avatar'),
      // Validate file truoc khi Upload
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    console.log('Upload Avatar');
    console.log('user data', req.user_data);
    console.log(file);

    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    this.userService.uploadAvatar(
      req.user_data.userId,
      file.destination + '/' + file.filename,
    );
  }
}
