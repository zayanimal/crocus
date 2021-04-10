import { RootStateTypes } from "@config/roots";

export const orderControlState = (state: RootStateTypes) =>
  state.admin.orderControl;

export const rate = (state: RootStateTypes) => orderControlState(state).rate;

export const modelInputValue = (state: RootStateTypes) =>
  orderControlState(state).modelInput;

export const modelsData = (state: RootStateTypes) =>
  orderControlState(state).modelsData;

export const modelsDataInOrder = (state: RootStateTypes) =>
  orderControlState(state).modelsDataInOrder;

export const modelsSelected = (state: RootStateTypes) =>
  orderControlState(state).modelsSelected;

export const listState = (state: RootStateTypes) =>
  orderControlState(state).showList;

export const orderForSend = (state: RootStateTypes) => ({
  modelsDataInOrder: modelsDataInOrder(state),
  rate: rate(state),
});

export const validation = (state: RootStateTypes) =>
  orderControlState(state).validation;
