import { Booking } from "src/booking/entities/booking.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Reason {
    @PrimaryGeneratedColumn()
    reasonId: number

    @OneToOne(() => Booking, (booking) => booking.reason)
    booking: Booking

    @Column()
    reasonCancle: string

    @Column()
    reasonReject: string
    
    @Column()
    rejectId: number

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date

}