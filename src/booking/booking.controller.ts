import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookingVehicleDto } from './dto/booking-vehicle.dto';
import { Booking } from './entities/booking.entity';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UpdateResult } from 'typeorm';

@ApiBearerAuth()
@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get('/')
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':bookingId')
  findOne() {}

  @Get('status/in-review-order')
  async getInReviewOrders(): Promise<Booking[] | { message: string }> {
    const bookings = await this.bookingService.findInReviewOrder();
    if (!bookings || bookings.length === 0) {
      return { message: 'Không tìm thấy xe ở trạng thái In-review-order' };
    }
    return bookings;
  }

  @Get('status/in-review-cancel')
  async getInReviewCancel(): Promise<Booking[] | { message: string }> {
    const bookings = await this.bookingService.findInReviewCancel();
    if (!bookings || bookings.length === 0) {
      return { message: 'Không tìm thấy xe ở trạng thái In-review-cancel' };
    }
    return bookings;
  }
  @Get('status/approve')
  async getApprove(): Promise<Booking[] | { message: string }> {
    const bookings = await this.bookingService.findApprove();
    if (!bookings || bookings.length === 0) {
      return { message: 'Không tìm thấy xe ở trạng thái approve' };
    }
    return bookings;
  }
  @Get('status/reject')
  async getReject(): Promise<Booking[] | { message: string }> {
    const bookings = await this.bookingService.findReject();
    if (!bookings || bookings.length === 0) {
      return { message: 'Không tìm thấy xe ở trạng thái reject' };
    }
    return bookings;
  }

  @Post()
  async create(
    @Body() createBookingVehicleDto: BookingVehicleDto,
  ): Promise<Booking> {
    return await this.bookingService.create(createBookingVehicleDto);
  }

  @Patch('/:bookingId')
  async update(
    @Param('bookingId') bookingId: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    const updateBooking = this.bookingService.update(
      bookingId,
      updateBookingDto,
    );
    return { message: 'Sửa thành công', updateBooking };
  }

  @Delete('/:bookingId')
  delete() {}
}
