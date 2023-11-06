import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Reason {
    @PrimaryGeneratedColumn()
    reasonId: number

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