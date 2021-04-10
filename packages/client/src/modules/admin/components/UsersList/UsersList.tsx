import React, { useMemo } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import type { ColumnProps } from "react-virtualized";
import { TableRowButton, TableVirtual } from "@interaktiv/ui";
import { ListHeader } from "@admin/components/ListHeader";
import { UsersProps } from "@admin/containers/Users";
import { bem } from "@interaktiv/utils";
import "./UsersList.scss";

const cn = bem("UsersList");

const UsersList: React.FC<UsersProps> = (props) => {
  const { list, meta, removeUser, getList, setUserEditName } = props;

  const { path } = useRouteMatch();
  const history = useHistory();

  interface RowData {
    username: string;
  }

  const columns: ColumnProps[] = useMemo(() => {
    const onEdit = (rowData: RowData) => () => {
      setUserEditName(rowData.username);
      history.push({ pathname: `${path}/edit/${rowData.username}` });
    };

    const onRemove = (rowData: RowData) => () => {
      removeUser(rowData.username);
    };

    return [
      {
        dataKey: "none",
        label: "",
        width: 90,
        cellRenderer: ({ rowData }) => (
          <TableRowButton
            onEdit={onEdit(rowData)}
            onRemove={onRemove(rowData)}
          />
        ),
      },
      {
        dataKey: "username",
        label: "Имя пользователя",
        width: 300,
      },
      {
        dataKey: "role",
        label: "Роль",
        width: 250,
      },
      {
        dataKey: "time",
        label: "Дата создания",
        width: 300,
        cellRenderer: ({ cellData }) =>
          new Date(cellData).toLocaleDateString("ru"),
      },
      {
        dataKey: "isActive",
        label: "Статус",
        width: 250,
        cellRenderer: ({ cellData }) =>
          cellData ? (
            <Chip label="Активен" size="small" color="primary" />
          ) : (
            <Chip label="Не активен" size="small" />
          ),
      },
    ];
  }, [removeUser, path, history, setUserEditName]);

  return (
    <div className={cn()}>
      <ListHeader />
      <TableVirtual
        list={list}
        getList={getList}
        columns={columns}
        meta={meta}
      />
    </div>
  );
};

export { UsersList };
