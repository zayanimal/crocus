import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@auth/auth.module";
import { UserModule } from "@user/user.module"
import { BrandModule } from './brand/brand.module';
import { BidModule } from './bid/bid.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    BrandModule,
    BidModule
  ],
})
export class AppModule {}
