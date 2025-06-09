import { Dispatch, HTMLAttributes, SetStateAction } from "react";

export type RateSelectType = {
  amount: number;
  currency: string;
  id:any
};

export interface SendCardProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  name: string;
  img?: string;
}

export interface TabItem {
  tab: string;
  name: string;
}

export interface BaseFilterTabProps {
  tab: TabItem[];
  active?: string;
  setActive?: Dispatch<SetStateAction<string>>;
}

type DetailType = {
  title: string;
  value: string;
};

export interface DetailsCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  details?: DetailType[];
}

export interface WalletCardProps {
  amount?: string | number;
  currency?: string;
  title?: string;
}