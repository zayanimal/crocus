import React from 'react';
import { DrawerForm } from '@interaktiv/ui';
import { bem } from '@interaktiv/utils';
import type { OrderControlDrawerType } from './OrderControlDrawer.interface';
import './OrderControlDrawer.scss';

const cn = bem('OrderControlDrawer');

const OrderControlDrawer: OrderControlDrawerType = (props) => {
    // const {} = props;

    return (
        <DrawerForm
            label='Данные о заказчике'
            width='350'
            toggle
            onClose={() => {}}>
            <div>Hello</div>
        </DrawerForm>
    );
};

export { OrderControlDrawer };
