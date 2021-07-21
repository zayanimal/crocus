import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from "typeorm";

import { Constructor } from '@shared/types'

@Entity()
export class Brand {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

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
}
