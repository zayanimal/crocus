import { forkJoin, of, from, Observable, throwError } from 'rxjs';
import { mergeMap, map, mapTo, catchError } from 'rxjs/operators';
import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './entities';
import { UserInfo } from '../user/entities';
import { Brand } from '../brand/entities';
import { BidDto } from './dto';
import { UserCurrentDto } from '../user/dto'

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

    public create(user: Observable<UserCurrentDto>, bid: BidDto) {
        return from(user).pipe(
            mergeMap(({ id }) => forkJoin([
                this.userInfoRepository.findOne({ userId: id }),
                this.brandRepository.findOne({ id: bid.brandId, userId: id })
            ])),
            map(([userInfo, brand]) => {
                this.checkUserInfo(userInfo)
                this.checkBrand(brand)

                const bid = { ...this.checkUserInfo(userInfo), ...this.checkBrand(brand) }
                delete bid.id;

                return this.bidRepository.create(bid)
            }),
            mergeMap((createdUser) => this.bidRepository.save(createdUser)),
            mapTo({ message: 'Заявка добавлена' })
        );
    }

    public getList(user: Observable<UserCurrentDto>) {
        return from(user).pipe(
            mergeMap(({ id }) =>  this.bidRepository.find({ userId: id }))
        );
    }

    private checkUserInfo(userInfo?: UserInfo) {
        if (userInfo) {
            return userInfo;
        }

        throw new BadRequestException('У пользователя нет контактов');
    }

    private checkBrand(brand?: Brand) {
        if (brand) {
            return brand;
        }

        throw new BadRequestException('У пользователя нет брэнда');
    }
}
