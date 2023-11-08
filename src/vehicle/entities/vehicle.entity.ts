import { Booking } from 'src/booking/entities/booking.entity';
import { StatusVehicle } from 'src/enums/statusVehicle.enum';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  vehicleId: number;

  @Column()
  type: string;

  @Column({ unique: true })
  licensePlate: string;

  @Column()
  seats: number;

  @Column({
    type: 'enum',
    enum: StatusVehicle,
    default: StatusVehicle.READY,
  })
  status: string;

  @OneToOne(() => User, (user) => user.vehicle)
  user:User

  @OneToMany(() => Booking, (booking) => booking.vehicle)
  booking: Booking[];
}
