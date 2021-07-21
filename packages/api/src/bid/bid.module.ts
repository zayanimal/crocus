import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { Bid } from './entities';
import { UserInfo } from '../user/entities'
import { Brand } from '../brand/entities'

@Module({
  imports: [TypeOrmModule.forFeature([Bid, UserInfo, Brand])],
  providers: [BidService],
  controllers: [BidController]
})
export class BidModule {}
