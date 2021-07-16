import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@auth/auth.module";
import { UsersController } from "@users/users.controller";
import { UsersService } from "@users/services/users.service";
import { UsersRepository } from "@users/repositories/users.repository";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
