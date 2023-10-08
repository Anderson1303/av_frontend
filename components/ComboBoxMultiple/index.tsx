import { IFilterParams, IGridParams, IOperator } from '../../interfaces/IGridParams';
import { TypeOption } from '../../interfaces/IOption';
import { IPagination } from '../../interfaces/IPagination';
import { IResponse, TResponse } from '../../interfaces/IResponse';
import {
  AutocompleteChangeReason,
  Box, Checkbox, debounce, FormControl, ListItem, ListItemText, OutlinedInputProps, useAutocomplete, UseAutocompleteProps
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SyntheticEvent, useCallback, useMemo, useState } from "react";
import { Input } from './Input';
import { Popover } from './Popover';
import { TUseSet } from '../../interfaces/IUseSet';
import { AxiosInstance } from 'axios';

export interface ComboBoxProps<TOption extends TypeOption, UseStateType>
  extends Omit<UseAutocompleteProps<TOption, boolean, boolean, boolean>, 'options'> {
  endpoint: string;
  dataMap: (data: TResponse[]) => TOption[];
  labelMap: (option: TOption) => string;
  labelProperty?: string;
  valueProperty?: string;
  childFieldProperty?: string;
  childValueProperty?: string | number;
  childOperator?: IOperator;
  operator?: IOperator;
  filter?: IFilterParams[];
  inputProps?: Omit<OutlinedInputProps, "fullWidth">;
  width?: number | string;
  helperText?: string;
  dataInit: string[];
  api: AxiosInstance;
  dataSet: TUseSet<UseStateType>;
}

export const ComboBoxMultiple = <TOption extends TypeOption, UseStateType>({
  endpoint, labelProperty = 'name', valueProperty = 'id', childFieldProperty,
  childValueProperty, childOperator = '=', operator = 'like', filter, inputProps,
  width = 300, helperText, dataMap, labelMap, dataInit, api,dataSet,
  ...rest
}: ComboBoxProps<TOption, UseStateType>) => {
  const [filterOption, setFilterOption] = useState({} as IFilterParams | null);
  const [pagination, setPagination] = useState({} as IPagination | undefined);

  const query = useInfiniteQuery(
    !!childFieldProperty
      ? [endpoint, childValueProperty, filterOption?.value]
      : [endpoint, filterOption?.value],
    async ({ pageParam = 1 }) => {

      const groupFilters: IFilterParams[] = [];
      !!filterOption?.value && groupFilters.push(filterOption);

      const { data: result } = await api.get<IResponse<TResponse[]>>
        (`${endpoint}?gridParams=${JSON.stringify({
          page: pageParam,
          itemsPerPage: 10,
          filter: groupFilters,
          sorter: []
        } as IGridParams)
          }`);

      setPagination(result.pagination);
      return result.success && !!result?.data
        ? { ...result, data: dataMap(result.data) }
        : { ...result, data: [] };
    }, {
    refetchOnWindowFocus: false,
    enabled: !!filterOption,
    cacheTime: 0,
    getNextPageParam: (lastPage, pages) => (lastPage.pagination?.page ?? 1) + 1,
  });

  const formattedData = useMemo(() => {
    return query.data?.pages?.flatMap(page => {
      return page.data.flat();
    })
  }, [query.data]);

  const debounceFilterOption = useCallback(debounce((event: string) => {
    !!event.match(/^\d+$/gm) ?
      setFilterOption({ property: valueProperty, operator: '=', value: event }) :
      setFilterOption({ property: labelProperty, operator: operator, value: event })
  }, 500), [filterOption]);

  const autocomplete = useAutocomplete({
    options: (formattedData as TOption[]) ?? [],
    getOptionLabel: (option) => typeof option !== 'string' ? labelMap(option as any) : "",
    filterOptions: x => x,
    onInputChange: (event, value, reason) => {
      event?.type === 'change' && debounceFilterOption(value)
    },
    isOptionEqualToValue: (option, value) => option === value,
    ...rest,
  });

  return (
    <Box {...autocomplete.getRootProps()}>
      <FormControl error={inputProps?.error}>
        <Input
          autocomplete={autocomplete as any}
          helperText={helperText}
          inputProps={inputProps}
          isLoading={query.isLoading}
          textMultiple={(dataSet.current.size == 0 ? "Nenhum " : dataSet.current.size) + " cliente(s) selecionado(s)." }
          width={width}
          onClick={() => {
            debounceFilterOption("")
            !!rest.onChange && rest.onChange(
              {} as SyntheticEvent<Element, Event>,
              null,
              {} as AutocompleteChangeReason);
          }}
        />
        <Popover
          pagination={pagination}
          query={query}
          autocomplete={autocomplete as any}
          width={width}
        >
          {(autocomplete.groupedOptions as TOption[]).map((option, index) => (
              <ListItem  key={option.value + option.label} value={option.value}>
                  <ListItemText>  
                      <Checkbox disabled={dataSet.current.size > 0 && !rest.multiple && !dataSet.has(option.value as UseStateType)} onChange={(ev) => {
                          var ischeck = dataSet.has(option.value as UseStateType);
                          if(!ischeck){
                            dataSet.add(option.value as UseStateType);
                          }else{
                            dataSet.remove(option.value as UseStateType);
                          }
                          }} checked={dataSet.has(option.value as UseStateType)} 
                      />
                      {labelMap(option)}
                  </ListItemText>
              </ListItem>
          ))}
        </Popover>
      </FormControl>
    </Box>
  );
}