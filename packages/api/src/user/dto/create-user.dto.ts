import { IsNotEmpty } from "class-validator";
import { UserInfo } from '@user/entities'

export class CreateUserDto {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  role!: string;

  @IsNotEmpty()
  info!: UserInfo
}
