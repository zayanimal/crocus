import {
    Entity,
    Column,
    PrimaryGeneratedColumn
  } from "typeorm";

import { Brand } from '../../brand/entities'

@Entity()
export class Bid extends Brand {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 50 })
    fullname!: string;

    @Column({ type: "varchar", length: 30 })
    email!: string;

    @Column({ type: "varchar", length: 30 })
    phone!: string;
}
