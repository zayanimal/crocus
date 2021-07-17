import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import { bem, handleInput } from '@interaktiv/utils'
import { UserControlProps } from 'modules/main/containers/UserControl'

const grid = bem('FlexGrid')

const UserContactsFields: React.FC<UserControlProps> = (props) => {
    const {
        email,
        setEmail,
        phone,
        setPhone,
        position,
        setPosition,
        validation
    } = props

    return (
        <>
            <InputLabel>Почта</InputLabel>
            <TextField
                error={!!validation.email}
                helperText={validation.email}
                className={grid('input')}
                type="email"
                value={email}
                onChange={handleInput(setEmail)}
            />
            <InputLabel>Телефон</InputLabel>
            <TextField
                error={!!validation.phone}
                helperText={validation.phone}
                className={grid('input')}
                type="text"
                value={phone}
                onChange={handleInput(setPhone)}
            />
            <InputLabel>Должность</InputLabel>
            <TextField
                error={!!validation.position}
                helperText={validation.position}
                className={grid('input')}
                type="text"
                value={position}
                onChange={handleInput(setPosition)}
            />
        </>
    )
}

export { UserContactsFields }
