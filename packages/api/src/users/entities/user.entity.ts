import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  JoinColumn,
  ManyToOne
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "@auth/entities/role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 30, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 50 })
  fullname!: string;

  @Column({ type: "varchar", length: 40 })
  email!: string;

  @Column({ type: "varchar", length: 40 })
  phone!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "uuid" })
  roleId!: string;

  @ManyToOne(() => Role)
  @JoinColumn()
  role!: Role;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
