import type { FC } from "react";

interface PriceTypes {
  id: number;
  model: string;
  price: number;
}

interface GoodsListProps {
  value: string;
  selected: PriceTypes[];
  listState: boolean;
  setValue: (value: string) => void;
  filterModels: (value: string) => void;
  onPick: (value: string | null) => void;
  onShowList: (value: boolean) => void;
}

export type GoodsListType = FC<GoodsListProps>;
