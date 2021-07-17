import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "@users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { User } from "@users/entities/user.entity";
import { Role } from "@auth/entities/role.entity";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([User, Role]),
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, PassportModule, JwtModule],
})
export class AuthModule {}
