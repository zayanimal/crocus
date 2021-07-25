import React, { ChangeEvent, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { AuthProps } from '@system/containers/Auth'
import { bem } from '@interaktiv/utils'
import './AuthForm.scss'

const cn = bem('AuthForm')

const AuthForm: React.FC<AuthProps> = (props) => {
    const { username, password, setLogin, setPassword, getCredentials } = props

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                getCredentials()
            }
        }

        document.addEventListener('keydown', keyHandler, false)

        return () => {
            document.removeEventListener('keydown', keyHandler, false)
        }
    }, [getCredentials])

    const onChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <div className={cn()}>
            <form className={cn('form')}>
                <h3>CROKUS аренда</h3>
                <TextField
                    value={username}
                    onChange={onChangeLogin}
                    label="Логин"
                    size="small"
                    variant="outlined"
                />
                <TextField
                    value={password}
                    onChange={onChangePassword}
                    label="Пароль"
                    size="small"
                    variant="outlined"
                    type="password"
                />
                <Button variant="outlined" color="primary" onClick={getCredentials}>
                    Войти
                </Button>
            </form>
        </div>
    )
}

export { AuthForm }
