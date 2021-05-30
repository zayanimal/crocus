import { IsEmail, IsPhoneNumber, MaxLength, MinLength } from 'class-validator'

const MIN_LENGTH = 5
const MAX_LENGTH = 20

export class ContactsEntity {
    @IsEmail({}, { message: 'Здесь должна быть почта' })
    email!: string

    @IsPhoneNumber('ru-RU', {
        message: 'Здесь должен быть указан номер телефона'
    })
    phone!: string

    @MinLength(MIN_LENGTH, { message: 'Не меньше 5-ти символов' })
    @MaxLength(MAX_LENGTH, { message: 'Не больше 20-ти символов' })
    position!: string
}
