import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Add from '@material-ui/icons/Add';
import { bem } from '@utils/formatters';
import { CompanyControlProps } from '@admin/containers/CompanyControl';
import './CompanyRequisites.scss';

const cn = bem('CompanyRequisites');

const CompanyRequisites: React.FC<CompanyControlProps> = (props) => {
    const {
        requisites,
        updateCurrentRequisites,
        deleteRequisitesForm,
        createRequisitesForm
    } = props;

    const onClick = (id: string) => () => {
        updateCurrentRequisites(id);
    };

    const onDelete = (id: string) => () => {
        deleteRequisitesForm(id);
    };

    return (
        <div className={cn()}>
            {requisites.map((req) => (
                <Chip
                    key={req.id}
                    className={cn('chip')}
                    color='secondary'
                    label={req.name}
                    onClick={onClick(req.id)}
                    onDelete={onDelete(req.id)}
                />
            ))}
            <IconButton onClick={createRequisitesForm} size='small'>
                <Add />
            </IconButton>
        </div>
    );
};

export { CompanyRequisites };
