export type IOperator = ">" | "<" | ">=" | "<=" | "=" | "like"

export type IFilterParams = {
  property: string;
  operator: IOperator | string;
  value: number | number[] | string | string[] | boolean;
}
export type ISortParams = {
  propertyName: string;
  direction: string;
}

export interface IGridParams {
  page: number;
  itemsPerPage: number;
  filter: IFilterParams[];
  sorter: ISortParams[]
}