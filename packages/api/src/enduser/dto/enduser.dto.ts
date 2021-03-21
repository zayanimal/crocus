import { chain } from 'lodash';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class EnduserDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => chain(value)
        .lowerCase()
        .upperFirst()
        .value())
    name!: string;

    @IsNotEmpty()
    @IsString()
    city!: string;
}
