import React, { ChangeEvent, MouseEvent, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import List from 'react-virtualized/dist/es/List'
import { bem } from '@interaktiv/utils/formatters'
import type { ListRowRenderer } from 'react-virtualized'
import type { GoodsListType } from './GoodsList.types'
import './GoodsList.scss'

const cn = bem('GoodsList')

const GoodsList: GoodsListType = (props) => {
    const {
        value,
        setValue,
        listState,
        onShowList,
        onPick,
        selected,
        filterModels
    } = props

    const ESCAPE = 'Escape'

    useEffect(() => {
        if (selected.length) {
            onShowList(true)
        } else {
            onShowList(false)
        }

        const keyHandler = (e: KeyboardEvent) => {
            if (e.key === ESCAPE) {
                filterModels('')
            }
        }

        document.addEventListener('keydown', keyHandler, false)

        return () => {
            document.removeEventListener('keydown', keyHandler, false)
        }
    }, [selected, onShowList, filterModels])

    const listHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        onPick(target.textContent)
    }

    const rowRenderer: ListRowRenderer = (props2) => {
        const { key, index, style } = props2

        return (
            <option
                key={key}
                style={style}
                onClick={listHandler}
                className={cn('item')}>
                {selected[index].good}
            </option>
        )
    }

    return (
        <>
            <TextField
                className={cn('input')}
                size="small"
                label="Найти модель"
                variant="outlined"
                value={value}
                onChange={(e: ChangeEvent) => {
                    const target = e.target as HTMLInputElement

                    setValue(target.value)
                    filterModels(target.value)
                }}
            />
            {listState && (
                <List
                    className={cn('paper')}
                    height={400}
                    width={1}
                    rowCount={selected.length}
                    rowHeight={40}
                    rowRenderer={rowRenderer}
                    containerStyle={{
                        width: '100%',
                        maxWidth: '100%'
                    }}
                    style={{
                        width: '100%',
                        outline: 'none'
                    }}
                />
            )}
        </>
    )
}

export { GoodsList }
