import { IsAlphanumeric, MaxLength, MinLength, ValidateIf } from 'class-validator'

const USERNAME_MIN_LENGTH = 4
const USERNAME_MAX_LENGTH = 15
const PASSWORD_MIN_LENGTH = 15
const PASSWORD_MAX_LENGTH = 15

export class UserFormEntity {
    @MinLength(USERNAME_MIN_LENGTH, { message: 'Не меньше 4-х символов' })
    @MaxLength(USERNAME_MAX_LENGTH, { message: 'Не больше 15-ти символов' })
    @IsAlphanumeric('en-US', { message: 'Только английские буквы или цифры' })
    username!: string

    @ValidateIf(({ password }) => !!password.length)
    @MinLength(PASSWORD_MIN_LENGTH, { message: 'Не меньше 5-ти символов' })
    @MaxLength(PASSWORD_MAX_LENGTH, { message: 'Не больше 30-ти символов' })
    @IsAlphanumeric('en-US', { message: 'Только английские буквы или цифры' })
    password!: string

    role!: string

    permissions!: string[]

    isActive!: boolean
}
