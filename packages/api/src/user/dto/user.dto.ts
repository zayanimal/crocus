import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  role!: string;
}
