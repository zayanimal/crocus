import type { ColumnProps } from 'react-virtualized';

export const columns: ColumnProps[] = [
    {
        dataKey: 'id',
        label: '№',
        width: 100
    },
    {
        dataKey: '',
        label: 'Наименование',
        width: 250
    },
    {
        dataKey: '',
        label: 'Кол-во',
        width: 100
    },
    {
        dataKey: '',
        label: 'Заказчик',
        width: 150
    },
    {
        dataKey: '',
        label: 'Статус',
        width: 150
    }
];
