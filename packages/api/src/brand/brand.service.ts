import { of } from "rxjs";
import { mergeMap, mapTo } from "rxjs/operators";
import {
    Injectable,
    Inject,
    InternalServerErrorException
} from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { BrandDto } from '@brand/dto'
import { Brand } from "@brand/entities";

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>
    ) {}

    create(brand: BrandDto) {
        return of(this.brandRepository.create(brand)).pipe(
            mergeMap((createdBrand) => this.brandRepository.save(createdBrand)),
            mapTo({ message: 'Бренд добавлен' })
        )
    }

    getList() {
        return this.brandRepository.find()
    }
}
