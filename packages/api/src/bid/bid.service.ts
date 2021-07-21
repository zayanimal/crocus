import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './entities'
import { UserInfo } from '../user/entities'
import { Brand } from '../brand/entities'

@Injectable()
export class BidService {
    constructor(
        @InjectRepository(Bid)
        private readonly bidRepository: Repository<Bid>,
        @InjectRepository(UserInfo)
        private readonly userInfoRepository: Repository<UserInfo>,
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>
    ) {}
}
