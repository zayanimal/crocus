import { from, throwError } from "rxjs";
import { mergeMap, map, mapTo, catchError } from "rxjs/operators";
import {
    Injectable,
    InternalServerErrorException
} from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { BrandDto } from '@brand/dto'
import { Brand } from "@brand/entities";
import { UserObservable } from '@shared/types'

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>
    ) {}

    public create(user: UserObservable, brand: BrandDto) {
        return from(user).pipe(
            map((user) => user.id),
            map((userId) => this.brandRepository.create({
                userId,
                ...brand
            })),
            mergeMap((createdBrand) => this.brandRepository.save(createdBrand)),
            mapTo({ message: 'Бренд добавлен' }),

            catchError((err) => throwError(new InternalServerErrorException(err.message)))
        );
    }

    public getList(user: UserObservable) {
        return from(user).pipe(
            mergeMap(({ id }) => this.brandRepository.find({ userId: id }))
        );
    }
}
