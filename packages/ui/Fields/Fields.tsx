import React, { ChangeEvent, memo } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { get, memoize } from 'lodash'
import { bem, classes } from '@interaktiv/utils'
import type { FieldsType } from './Fields.types'
import './Fields.scss'

const cn = bem('Fields')

const Fields: FieldsType = memo((props) => {
    const { fields, entity, handler } = props

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        handler({ id: entity.id, [name]: value })
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
                        // TODO: обернуть в материал утилс
                        <KeyboardDatePicker
                            disableToolbar
                            onChange={() => {}}
                            value=""
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            minDate={new Date()}
                            helperText="Срок поставки"
                        />
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
