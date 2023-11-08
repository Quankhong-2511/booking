import { Exclude } from 'class-transformer';
import { UserRole } from 'src/enums/user.enum';
import { Role } from 'src/roles/entities/role.entity';
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
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  typeAccount: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  // constructor(partial: Partial<User>) {
  //   Object.assign(this, partial)
  // }

  @Column()
  fullname: string;

  @Column({ nullable: true, default: null })
  avatar: string;

  @Column({ nullable: true })
  department: string;

  @Column({ unique: true })
  employeeId: string;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @Exclude()
  @Column({ nullable: true, default: null })
  refreshToken?: string;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.user,{
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
