/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50 })
    name: string;

    @Column({ type: "varchar", length: 50 })
    phoneno: string;

    @Column({ type: "varchar", length: 300 })
    address: string;

    @Column({ type: "varchar", length: 50 })
    email: string;

    @Column({ type: "varchar", length: 100 })
    password: string;

    @Column({ type: "boolean", default: false })
    isadmin: boolean;

}