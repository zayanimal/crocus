import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  JoinColumn,
  ManyToOne,
  OneToOne
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "@auth/entities/role.entity";
import { UserInfo } from '@user/entities'

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 30, unique: true })
  username!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "uuid" })
  roleId!: string;

  @ManyToOne(() => Role)
  @JoinColumn()
  role!: Role;

  @OneToOne(() => UserInfo)
  info!: UserInfo;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
