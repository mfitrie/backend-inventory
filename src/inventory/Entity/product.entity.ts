/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50 })
    name: string

    @Column({ type: "varchar", length: 300 })
    description: string

    @Column({ type: "real" })
    price: number

    @Column({ type: "integer" })
    quantity: number
    
    @Column({ type: "varchar", length: 300 })
    imagelink: string
}