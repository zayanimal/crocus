import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootStateTypes } from '@config/roots'
import { systemActions } from '@system/store/actions'
import { listActions } from '@bid/actions'
import { listSelectors } from '@bid/selectors'
import { BidList } from '@bid/components/BidList'

const mapStateToProps = (state: RootStateTypes) => ({
    list: listSelectors.list(state)
})

const mapDispatchToProps = {
    setHeaderTitle: systemActions.setHeaderTitle,
    getList: listActions.getList.request
}

export type BidProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const Bid: FC<BidProps> = (props) => {
    const { setHeaderTitle, getList, ...rest } = props
    const { pathname } = useLocation()
    const { path } = useRouteMatch()

    useEffect(() => {
        if (pathname === '/bid') {
            setHeaderTitle('Управление заявками')
        }

        getList()
    }, [pathname, setHeaderTitle, getList])

    return (
        <Switch>
            {/* <Route path={`${path}/add`} component={} /> */}
            {/* <Route path={`${path}/edit/:brand`} component={} /> */}
            <Route exact path={path} render={() => <BidList {...rest} />} />
        </Switch>
    )
}

const BidConnected = connect(mapStateToProps, mapDispatchToProps)(Bid)

export { BidConnected as Bid }
