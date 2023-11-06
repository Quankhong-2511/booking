import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('reason')
@ApiTags('Reason')
export class ReasonController {

    @Get('/')
    findAll(){}

    @Post('/')
    create(){}

    @Patch('/:reasonId')
    update(){}

    @Delete('/:reasonId')
    delete(){}

}
