import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class Role {
    @ApiProperty({example: 1})
    @PrimaryColumn()
    id: number

    @ApiProperty({example: 'admin'})
    @Column()
    name?: string
}