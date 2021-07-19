import {
    Entity,
    Column,
    PrimaryGeneratedColumn
  } from "typeorm";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 40 })
    companyName!: string;
}
