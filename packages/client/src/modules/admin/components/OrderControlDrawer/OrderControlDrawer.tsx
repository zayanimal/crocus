import React from "react";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { DrawerForm } from "@interaktiv/ui";
import { bem } from "@interaktiv/utils";
import type { OrderControlDrawerType } from "./OrderControlDrawer.interface";
import "./OrderControlDrawer.scss";

const cn = bem("OrderControlDrawer");

const OrderControlDrawer: OrderControlDrawerType = (props) => {
  // const {} = props;

  return (
    <DrawerForm
      label="Данные о заказчике"
      width="350"
      toggle={false}
      onClose={() => {}}
    >
      <div className={cn()}>
        <div className={cn("row")}>
          <TextField
            label="Название заказчика"
            onChange={() => {}}
            value=""
            error={false}
            size="small"
            fullWidth
            multiline
            helperText=""
          />
        </div>
        <div className={cn("row")}>
          <TextField
            label="Город"
            onChange={() => {}}
            value=""
            error={false}
            size="small"
            helperText=""
          />
        </div>
        <div className={cn("row")}>
          <KeyboardDatePicker
            disableToolbar
            onChange={() => {}}
            value=""
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            minDate={new Date()}
            helperText="Срок поставки"
          />
        </div>
        <div className={cn("row")}>
          <TextField
            label="Дополнительная информация"
            onChange={() => {}}
            value=""
            error={false}
            size="small"
            fullWidth
            multiline
            helperText=""
          />
        </div>
      </div>
    </DrawerForm>
  );
};

export { OrderControlDrawer };
