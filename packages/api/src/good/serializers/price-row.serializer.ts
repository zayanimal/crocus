import { isString } from 'lodash';
import { Transform } from 'class-transformer';

export class RowEntity {
    @Transform(({ value }) => value.trim())
    name!: string;

    @Transform(({ value }) => (isString(value) ? 0 : value))
    price!: number;

    description!: string;
}
