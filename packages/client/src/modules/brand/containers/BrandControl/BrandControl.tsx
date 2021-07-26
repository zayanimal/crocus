import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { RootStateTypes } from '@config/roots'
import { systemActions } from '@system/store/actions'
import { controlActions } from '@brand/actions'
import { controlSelectors } from '@brand/selectors'
import { FormControls } from '@main/components/FormControls'
import { Fields, Preloader } from '@interaktiv/ui'
import { bem, classes, handleSelect } from '@interaktiv/utils'
import type { FC } from 'react'
import './BrandControl.scss'

const cn = bem('BrandControl')
const grid = bem('FlexGrid')

const mapStateToProps = (state: RootStateTypes) => ({
    brand: controlSelectors.brand(state),
    type: controlSelectors.type(state),
    malls: controlSelectors.malls(state),
    editMode: controlSelectors.editMode(state)
})

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getBrand: controlActions.getBrand.request,
    addBrand: controlActions.addBrand.request,
    editBrand: controlActions.editBrand.request,
    set: controlActions.set,
    setType: controlActions.setType,
    setMalls: controlActions.setMalls,
    setEditMode: controlActions.setEditMode,
    clear: controlActions.clear
}

export type BrandControlProps = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps

const BrandControl: FC<BrandControlProps> = (props) => {
    const {
        brand,
        type,
        malls,
        setHeaderTitle,
        editMode,
        getBrand,
        addBrand,
        editBrand,
        set,
        setType,
        setMalls,
        setEditMode,
        clear
    } = props
    const { path, params } = useRouteMatch<{ user: string }>()

    const fields = [
        { label: 'Название', name: 'name' },
        { label: 'Названия брэндов', name: 'brandNames' },
        { label: 'Всего магазинов', name: 'shopsTotal' },
        { label: 'Магазины в ТЦ', name: 'shopsInMalls' }
    ]

    useEffect(() => {
        if (path.includes('edit')) {
            getBrand(params.user)
            setHeaderTitle('Редактирование брэнда')
            setEditMode(true)
        } else {
            setHeaderTitle('Добавление брэнда')
            setEditMode(false)
        }
  }, []); // eslint-disable-line

    const onEdit = () => {
        editBrand(params.user)
    }

    return editMode ? (
        <Preloader />
    ) : (
        <>
            <div className={classes(grid('row'))}>
                <div className={grid('col-6')}>
                    <h3> </h3>
                    <Fields fields={fields} entity={brand} handler={set} />
                </div>
                <div className={grid('col-3')}>
                    <h3> </h3>
                    <div className={cn('select')}>
                        <InputLabel id="select-label">Торговый профиль</InputLabel>
                        <Select
                            labelId="select-label"
                            id="simple-select"
                            fullWidth
                            value={type}
                            onChange={handleSelect(setType)}>
                            <MenuItem value="Офис">Офис</MenuItem>
                            <MenuItem value="Склад">Склад</MenuItem>
                            <MenuItem value="Киоск">Киоск</MenuItem>
                            <MenuItem value="Одежда">Одежда</MenuItem>
                            <MenuItem value="Обувь">Обувь</MenuItem>
                        </Select>
                    </div>
                    <div className={cn('select')}>
                        <InputLabel id="select-label-2">
                            Интересующий объект
                        </InputLabel>
                        <Select
                            labelId="select-label-2"
                            id="simple-select-2"
                            fullWidth
                            value={malls}
                            onChange={handleSelect(setMalls)}>
                            <MenuItem value="VEGAS Каширское шоссе">
                                VEGAS Каширское шоссе
                            </MenuItem>
                            <MenuItem value="VEGAS Крокус Сити">
                                VEGAS Крокус Сити
                            </MenuItem>
                            <MenuItem value="VEGAS Сити Мол">
                                VEGAS Сити Мол
                            </MenuItem>
                        </Select>
                    </div>
                </div>
            </div>
            <FormControls
                mode={editMode}
                backward="/brand"
                onEdit={onEdit}
                onAdd={addBrand}
                onClean={clear}
            />
        </>
    )
}

const BrandControlConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(BrandControl)

export { BrandControlConnected as BrandControl }
