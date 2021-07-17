import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 30,
    unique: true,
  })
  name!: string;
}
