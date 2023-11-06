import { UserRole } from 'src/enums/user.enum';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  typeAccount: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column({ nullable: true, default: null })
  avatar: string;

  @Column({ nullable: true })
  department: string;

  @Column({ unique: true })
  employeeId: string;

  @Column({ nullable: true, default: null })
  refreshToken?: string;

  @OneToOne(() => Vehicle, {
    cascade: true,
    onDelete: 'CASCADE'
  }
  )
  @JoinColumn()
  vehicle?: Vehicle;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
