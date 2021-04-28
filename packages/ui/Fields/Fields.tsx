import React, { ChangeEvent, memo } from 'react'
import { get, memoize } from 'lodash'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import ruLocale from 'date-fns/locale/ru'
import { bem, classes } from '@interaktiv/utils'
import type { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import type { FieldsType } from './Fields.types'
import './Fields.scss'

const cn = bem('Fields')

const Fields: FieldsType = memo((props) => {
    const { fields, entity, handler } = props

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        handler({ id: entity.id, [name]: value })
    }

    const onChangeDate = (name: string) => (date: MaterialUiPickersDate) => {
        handler({ id: entity.id, [name]: date })
    }

    const getError = memoize((field: string) =>
        get(entity, `validation.${field}`, '')
    )

    const isDate = (value?: string) => value === 'date'

    return (
        <>
            {fields.map((field) => (
                <div key={field.name} className={field?.class || cn()}>
                    <InputLabel className={classes(field?.labelClass)}>
                        {field.label}
                    </InputLabel>
                    {isDate(field.type) ? (
                        <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={ruLocale}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd-MM-yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                minDate={new Date()}
                                error={!!getError(field.name)}
                                helperText={getError(field.name)}
                                value={get(entity, field.name)}
                                onChange={onChangeDate(field.name)}
                            />
                        </MuiPickersUtilsProvider>
                    ) : (
                        <TextField
                            fullWidth
                            name={field.name}
                            error={!!getError(field.name)}
                            helperText={getError(field.name)}
                            type={field?.type || 'text'}
                            value={get(entity, field.name)}
                            onChange={onChange}
                        />
                    )}
                </div>
            ))}
        </>
    )
})

export { Fields }
