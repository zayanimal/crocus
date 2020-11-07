import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { rootStateTypes } from '@system/store/roots';
import { TextField, Button } from '@material-ui/core';
import { systemActions } from '@system/store/actions';
import { systemSelectors } from '@system/store/selectors';
import { bem } from '@utils/formatters';
import './Auth.scss';

const cn = bem('Auth');

const mapStateToProps = (state: rootStateTypes) => ({
    username: systemSelectors.username(state),
    password: systemSelectors.password(state),
    isLoggedIn: systemSelectors.isLoggedIn(state)
});

const mapDispatchToProps = {
    setLogin: systemActions.setLogin,
    setPassword: systemActions.setPassword,
    getCredentials: systemActions.getCredentials
};

type AuthProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Auth: React.FC<AuthProps> = (props) => {
    const {
        username,
        password,
        setLogin,
        setPassword,
        getCredentials
    } = props;

    const onChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div className={cn()}>
            <form className={cn('form')}>
                <h3>ISKOR Interaktiv</h3>
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
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={getCredentials}
                >
                    Войти
                </Button>
            </form>
        </div>
    );
};

const AuthConnected = connect(mapStateToProps, mapDispatchToProps)(Auth);

export { AuthConnected as Auth };
