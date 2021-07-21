import { Exclude, Expose, Transform } from "class-transformer";
import { groupSerial } from "@shared/utils";
import { Role } from "@/auth/entities/role.entity";

export const LIST_GROUP = groupSerial("list");
export const FIND_GROUP = groupSerial("find");
export const EDIT_GROUP = groupSerial("edit");

export class UserEntity {
  @Expose({ groups: ["find"] })
  id!: string;

  @Expose({ groups: ["list", "find", "edit"] })
  username!: string;

  @Exclude()
  password!: string;

  @Exclude()
  roleId!: string;

  @Expose({ groups: ["list", "find", "edit"] })
  @Transform(({ value }) => value.name)
  role!: Role;
}
