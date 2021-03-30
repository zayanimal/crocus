import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { GoodsList } from '@shared/components/GoodsList';
import { OrderControlDrawer } from '@admin/components/OrderControlDrawer';
import { orderControlSelectors } from '@admin/store/selectors';
import { orderControlActions } from '@admin/store/actions';
import type { RootStateTypes } from '@config/roots';
import { bem } from '@interaktiv/utils';

const cn = bem('OrderControl');
const grid = bem('FlexGrid');

const mapStateToProps = (state: RootStateTypes) => ({
    modelInputValue: orderControlSelectors.modelInputValue(state),
    modelsData: orderControlSelectors.modelsData(state),
    modelsDataInOrder: orderControlSelectors.modelsDataInOrder(state),
    modelsSelected: orderControlSelectors.modelsSelected(state),
    listState: orderControlSelectors.listState(state),
    validation: orderControlSelectors.validation(state)
});

const mapDispatchToProps = {
    fetchPrice: orderControlActions.fetchPriceList.request,
    sendNewProject: orderControlActions.sendNewProject,
    setModelInputValue: orderControlActions.setModelInputValue,
    filterModels: orderControlActions.filterModels,
    cleanPrice: orderControlActions.cleanPriceList,
    putModelInOrder: orderControlActions.putModelInOrder,
    deleteModelInOrder: orderControlActions.deleteModelInOrder,
    updateModelInOrder: orderControlActions.updateModelInOrder,
    showList: orderControlActions.showList
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const OrderControl: React.FC<Props> = (props) => {
    const {
        fetchPrice,
        modelsSelected,
        modelInputValue,
        setModelInputValue,
        filterModels,
        cleanPrice,
        modelsData,
        modelsDataInOrder,
        putModelInOrder,
        listState,
        showList,
        sendNewProject,
        validation
    } = props;

    useEffect(() => {
        fetchPrice();

        return () => {
            cleanPrice();
        };
    }, [fetchPrice, cleanPrice]);

    const orderHandler = (value: string | null): void => {
        if (modelsDataInOrder.some(({ model }) => model === value)) return;

        putModelInOrder({
            // eslint-disable-next-line prefer-object-spread
            ...Object.assign(
                {},
                modelsData.find(({ model }) => model === value)
            ),
            count: 1
        });
    };

    return (
        <div className={grid('row')}>
            <div className={grid('col-3')}>
                <Button
                    color='secondary'
                    variant='outlined'
                    style={{ width: '100%' }}>
                    Заказчик
                </Button>
                <GoodsList
                    value={modelInputValue}
                    setValue={setModelInputValue}
                    selected={modelsSelected}
                    filterModels={filterModels}
                    onPick={orderHandler}
                    listState={listState}
                    onShowList={showList}
                />
            </div>
            <div className={grid('col-9')}>
                <div className={cn('controls')}>
                    <Button
                        variant='outlined'
                        color='primary'
                        disabled={!validation}
                        onClick={sendNewProject}>
                        Отправить запрос
                    </Button>
                </div>
            </div>
            <OrderControlDrawer hello='hello' />
        </div>
    );
};

const OrderControlConnected = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderControl);

export { OrderControlConnected as OrderControl };
