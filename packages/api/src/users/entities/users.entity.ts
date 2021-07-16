import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Roles } from "@auth/entities/roles.entity";
import { Permissions } from "@auth/entities/permissions.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 30,
    unique: true,
  })
  username!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  time!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "uuid", default: "bbab9d8b-0bda-4f16-ae8d-59334e38a7c8" })
  roleId!: string;

  @ManyToOne(() => Roles)
  @JoinColumn()
  role!: Roles;

  @ManyToMany(() => Permissions)
  @JoinTable()
  permissions!: Permissions[];

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
