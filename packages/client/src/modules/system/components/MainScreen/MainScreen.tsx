import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { Drawer } from '@system/components/Drawer'
import { Header } from '@system/components/Header'
import { Preloader } from '@interaktiv/ui/Preloader'
import { LayoutProps } from '@system/containers/Layout'
import { routeComponent } from '@system/components/MainScreen/routeComponents'
import { bem } from '@interaktiv/utils'
import './MainScreen.scss'

const cn = bem('MainScreen')

const MainScreen: React.FC<LayoutProps> = (props) => {
    const { isLoggedIn, routerItems } = props
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        history.push('/brand')
    }, [])

    if (isLoggedIn) {
        return (
            <>
                <Drawer {...props} />
                <div className={cn()}>
                    <Header {...props} />
                    <main className={cn('main')}>
                        <Suspense fallback={<Preloader />}>
                            <Switch>
                                {routerItems.map((route) => (
                                    <Route
                                        key={route.key}
                                        path={route.path}
                                        component={routeComponent.create(
                                            route.component
                                        )}
                                    />
                                ))}
                            </Switch>
                        </Suspense>
                    </main>
                </div>
            </>
        )
    }

    return <Redirect to={{ pathname: '/auth', state: { from: location } }} />
}

export { MainScreen }
