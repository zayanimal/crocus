import { forkJoin, from, Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './entities';
import { UserInfo } from '../user/entities';
import { Brand } from '../brand/entities';
import { BidDto } from './dto';
import { UserCurrentDto } from '../user/dto'
import { User } from '@user/entities';

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

    create(user: Observable<UserCurrentDto>, bid: BidDto) {
        return from(user).pipe(
            mergeMap(({ id }) => forkJoin([
                this.userInfoRepository.findOne({ userId: id }),
                // TODO: проверка на соответствие юзеру
                this.brandRepository.findOne({ id: bid.brandId })
            ]))
        )
    }
}
