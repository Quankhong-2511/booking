import { Injectable } from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { BookingVehicleDto } from './dto/booking-vehicle.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  findAll(): Promise<Booking[]> {
    return this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.vehicle', 'vehicle')
      .orderBy('booking.bookingId')
      .getMany();
  }

  findOne() {}

  async findInReviewOrder(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: { statusBooking: 'In-review-order' },
    });
  }

  async findInReviewCancel(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: { statusBooking: 'In-review-cancel' },
    });
  }

  async findApprove(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: { statusBooking: 'Approve' },
    });
  }

  async findReject(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: { statusBooking: 'Reject' },
    });
  }

  async findPreStart(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: { statusTrip: 'Pre-start' },
    });
  }

  async findEnd(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: { statusTrip: 'End' },
    });
  }

  async create(createBookingVehicleDto: BookingVehicleDto): Promise<Booking> {
    return await this.bookingRepository.save(
      this.bookingRepository.create(createBookingVehicleDto),
    );
  }

  async update(
    bookingId: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<UpdateResult> {
    return await this.bookingRepository.update(bookingId, updateBookingDto);
  }

  delete() {}
}
