import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootStateTypes } from '@config/roots'
import { systemActions } from '@system/store/actions'
import { controlActions } from '@brand/actions'
import { controlSelectors } from '@brand/selectors'
import { FormControls } from '@main/components/FormControls'
import { Fields, Preloader } from '@interaktiv/ui'
import { bem, classes } from '@interaktiv/utils'
import type { FC } from 'react'
import './BrandControl.scss'

const cn = bem('UserControl')
const grid = bem('FlexGrid')

const mapStateToProps = (state: RootStateTypes) => ({
    brand: controlSelectors.brand(state),
    editMode: controlSelectors.editMode(state)
})

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getBrand: controlActions.getBrand.request,
    addBrand: controlActions.addBrand.request,
    editBrand: controlActions.editBrand.request,
    set: controlActions.set,
    setEditMode: controlActions.setEditMode,
    clear: controlActions.clear
}

export type BrandControlProps = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps

const BrandControl: FC<BrandControlProps> = (props) => {
    const {
        brand,
        setHeaderTitle,
        editMode,
        getBrand,
        addBrand,
        editBrand,
        set,
        setEditMode,
        clear
    } = props
    const { path, params } = useRouteMatch<{ user: string }>()

    const fields = [
        { label: 'Тип', name: 'type' },
        { label: 'Название', name: 'name' },
        { label: 'Названия брэндов', name: 'brandNames' },
        { label: 'Всего магазинов', name: 'shopsTotal' },
        { label: 'Магазины в ТЦ', name: 'shopsInMalls' }
        // { label: 'ТЦ', name: 'malls' }
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
                <div className={grid('col-12')}>
                    <h3>Ваш брэнд</h3>
                    <Fields fields={fields} entity={brand} handler={set} />
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
