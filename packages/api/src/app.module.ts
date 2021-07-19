import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@auth/auth.module";
import { UserModule } from "@user/user.module"
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    BrandModule
  ],
})
export class AppModule {}
