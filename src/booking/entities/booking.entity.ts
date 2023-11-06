import { Area } from 'src/enums/area.enum';
import { StatusBooking } from 'src/enums/statusBooking.enum';
import { StatusTrip } from 'src/enums/statusTrip.enum';
import { Reason } from 'src/reason/entities/reason.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.booking)
  vehicle: Vehicle;

  @Column()
  owner: string;

  @Column()
  department: string;

  @Column()
  reason: string;

  @Column()
  timeStart: Date;

  @Column()
  timeEnd: Date;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  numberOfPeople: number;

  @Column()
  positionOfPerson: string;

  @Column({
    type: 'enum',
    enum: StatusBooking,
    default: StatusBooking.IN_REVIEW_ORDER,
  })
  statusBooking: string;

  @Column({
    type: 'enum',
    enum: StatusTrip,
    default: StatusTrip.PRE_START,
  })
  statusTrip: string;

  @Column({type: 'enum', enum: Area})
  area: string;

  @OneToOne(() => Reason)
  @JoinColumn({name: 'reason_cancle'})
  reasonCancle: Reason

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
