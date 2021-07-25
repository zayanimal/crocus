import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootStateTypes } from '@config/roots'
import { systemActions } from '@system/store/actions'
import { listActions } from '@brand/actions'
import { listSelectors } from '@brand/selectors'
import { BrandList } from '@brand/components/BrandList'

const mapStateToProps = (state: RootStateTypes) => ({
    list: listSelectors.list(state)
})

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getList: listActions.getList.request
}

export type BrandProps = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps

const Brand: FC<BrandProps> = (props) => {
    const { setHeaderTitle, getList, ...rest } = props
    const { pathname } = useLocation()
    const { path } = useRouteMatch()

    useEffect(() => {
        if (pathname === '/brand') {
            setHeaderTitle('Управление брэндами')
        }

        getList()
    }, [pathname, setHeaderTitle, getList])

    return (
        <Switch>
            {/* <Route path={`${path}/add`} component={} /> */}
            {/* <Route path={`${path}/edit/:brand`} component={} /> */}
            <Route exact path={path} render={() => <BrandList {...rest} />} />
        </Switch>
    )
}

const BrandConnected = connect(mapStateToProps, mapDispatchToProps)(Brand)

export { BrandConnected as Brand }
