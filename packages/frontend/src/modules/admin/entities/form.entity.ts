import {
    MinLength,
    MaxLength,
    ValidateIf,
    ValidateNested,
    IsAlphanumeric,
} from 'class-validator';
import { ContactsEntity } from '@admin/entities';

export class UserFormEntity {
    constructor(payload: UserFormEntity) {
        Object.assign(this, payload);
    }

    @MinLength(4, { message: 'Не меньше 4-х символов'})
    @MaxLength(10, { message: 'Не больше 10-ти символов'})
    @IsAlphanumeric('en-US', { message: 'Только английские буквы или цифры' })
    username!: string;

    @ValidateIf(({ password }) => !!password.length)
    @MinLength(5, { message: 'Не меньше 5-ти символов'})
    @MaxLength(30, { message: 'Не больше 30-ти символов'})
    @IsAlphanumeric('en-US', { message: 'Только английские буквы или цифры' })
    password!: string;

    role!: string;

    permissions!: string[];

    @ValidateNested()
    contacts!: ContactsEntity;
}