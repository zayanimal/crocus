import { User } from "@user/entities";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "varchar", length: 30 })
  type!: string;

  @Column({ type: "varchar", length: 40 })
  name!: string;

  @Column({ type: "varchar", length: 100 })
  brandNames!: string;

  @Column({ type: "integer" })
  shopsTotal!: number;

  @Column({ type: "integer" })
  shopsInMalls!: number;

  @Column({ type: "varchar", length: 40 })
  malls!: string;

  @Column({ type: "varchar" })
  userId!: string;

  @ManyToOne(() => User, (user) => user.brand, { cascade: true, onDelete: "CASCADE" })
  user!: User;
}
