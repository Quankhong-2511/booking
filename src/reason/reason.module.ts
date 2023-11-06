import { Module } from '@nestjs/common';
import { ReasonController } from './reason.controller';
import { ReasonService } from './reason.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reason } from './entities/reason.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reason]),
    ConfigModule
  ],
  controllers: [ReasonController],
  providers: [ReasonService]
})
export class ReasonModule {}
