import { TypeOption } from "./IOption";

export interface IClientUnification {
  id?: number;
  description: string;
  clientType: number;
  status: boolean;
  isGroup: boolean;
  groupingUnification?: {
    id: number;
    clientType: number;
    description: string;
  }[]
}

export interface IFormInsertClientunification {
  description: string;
  isGroup: boolean;
  ChainDistributor: TypeOption;
}

export interface IFormUpdateClientunification {
  description: string;
  status: boolean;
  ChainDistributor: TypeOption;
}