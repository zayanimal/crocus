import { from } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Margin } from '@good/margin/entities/margin.entity';

@Injectable()
export class MarginService {
    constructor(
        @InjectRepository(Margin)
        private readonly marginRepository: Repository<Margin>
    ) {}

    /**
     * Создать уровень прибыли для товара
     * @param margin
     */
    create(margin: number) {
        return from(this.marginRepository.save(
            this.marginRepository.create({ margin })
        )).pipe(toArray());
    }
}