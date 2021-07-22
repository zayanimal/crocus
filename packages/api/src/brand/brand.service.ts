import { of, from } from "rxjs";
import { mergeMap, map, mapTo } from "rxjs/operators";
import {
    Injectable,
    Inject,
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

    create(user: UserObservable, brand: BrandDto) {
        return from(user).pipe(
            map((user) => user.id),
            map((userId) => this.brandRepository.create({
                userId,
                ...brand
            })),
            mergeMap((createdBrand) => this.brandRepository.save(createdBrand)),
            mapTo({ message: 'Бренд добавлен' })
        );
    }

    getList() {
        return this.brandRepository.find()
    }
}
