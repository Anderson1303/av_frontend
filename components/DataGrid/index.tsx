import { Box, debounce } from "@mui/material";
import {
  GridColDef,
  GridFilterModel,
  GridRowSelectionModel,
  GridRowsProp,
  GridValidRowModel,
  DataGrid as MuiDataGrid,
  DataGridProps as MuiDataGridProps,
  getGridNumericOperators,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { useSnackbar } from "notistack";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { QueryClient } from "react-query";
import { IFilterParams, IGridParams } from "../../interfaces/IGridParams";
import { IResponse } from "../../interfaces/IResponse";
import { ButtonCrud } from "./ButtonCrud";
import { SkeletonDataGrid } from "./SkeletonDataGrid";
import DataGridFooter from './Footer'
import { localeText } from "./localeText";

const queryClient = new QueryClient();

export interface IPermissionMove {
  data: string[];
  success: boolean;
  total: number;
}

type Permission = {
  p_id_modulo: number;
  p_id_usuario: number;
}

export interface DataGridProps<T extends GridValidRowModel>
  extends Omit<MuiDataGridProps<T>, "rows"> {
  endpoint: string;
  rowsMap: (rows: T[]) => GridRowsProp<T>;
  createId?: string;
  updateId?: string;
  handleSearch?: (selection: GridRowSelectionModel) => void;
  handleCreate?: () => void;
  handleUpdate?: (selection: GridRowSelectionModel) => void;
  handleDetail?: (selection: GridRowSelectionModel) => void;
  handleDelete?: (selection: GridRowSelectionModel) => void;
  getSelectionModel?: (selection: GridRowSelectionModel, rows?: T) => void;
  propertyFilterId?: string;
  isSelectionModel?: boolean;
  filterParams?: IFilterParams[];
  filterSearch?: IFilterParams[];
  api: AxiosInstance;
  filterColunms?: boolean;
}

export const DataGrid = <T extends GridValidRowModel>({
  endpoint,
  rowsMap,
  createId = "",
  updateId = "",
  handleSearch,
  handleCreate,
  handleUpdate,
  handleDetail,
  handleDelete,
  getSelectionModel,
  propertyFilterId = "id",
  isSelectionModel = false,
  api,
  filterParams = [],
  filterSearch = [],
  filterColunms = false,
  ...rest
}: DataGridProps<T>) => {
  const [selectionMemo, setSelectionMemo] = useState<GridRowSelectionModel>([]);
  const [selection, setSelection] = useState<GridRowSelectionModel>([]);
  const [rowCount, setRowCount] = useState<number | undefined>(undefined);
  const [rowCountState, setRowCountState] = useState(rowCount || 0);
  const [gridParams, setGridParams] = useState<IGridParams>({
    page: 1,
    itemsPerPage: 10,
    filter: filterParams,
    sorter: [],
  });
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const filterSearchDeferredValue = useDeferredValue(filterSearch);
  const { enqueueSnackbar } = useSnackbar();

  const rows = useQuery(
    [
      endpoint,
      gridParams.page,
      gridParams.itemsPerPage,
      gridParams.sorter,
      filterParams
    ],
    async () => {
      gridParams.filter = filterParams;

      const { data: result } = await api.get<IResponse<T[]>>(
        `${endpoint}?gridParams=${encodeURIComponent(
          JSON.stringify(gridParams)
        )}`
      );

      if (!result.success) {
        result.error?.code !== 404 &&
          enqueueSnackbar(
            result.messages?.[0]?.message ??
            `Ocorreu um erro: ${result.error?.code ?? 500} - ${result.error?.message ?? "Internal Server Error"
            }`,
            { variant: "error" }
          );
        setRowCount(undefined);
        return [] as readonly T[];
      }
      setRowCount(result.pagination?.totalItems);
      return rowsMap(result.data!);
    },
    {
      refetchOnWindowFocus: true,
      cacheTime: 2 * 60 * 1000, // 2 minutes
      onError(error: any) {
        enqueueSnackbar(
          `Ocorreu um erro: ${error.response?.status ?? 500} - ${error.response?.statusText ?? "Internal Server Error"
          }`,
          { variant: "error" }
        );
      },
    }
  );

  const getOperator = (operator: string) => {
    let newOperator

    if (operator === 'contains')
      newOperator = 'like'
    else if (operator === 'is')
      newOperator = '='
    else
      newOperator = `${operator}`

    return newOperator
  }

  const debounceFilter = useCallback(
    debounce((model: GridFilterModel) => {
      model.items.forEach((item) => {
        const { value, field, operator } = item
        if (value) {
          setGridParams((prev) => ({
            ...prev,
            page: 1,
            filter: [
              ...prev.filter,
              {
                property: field.toUpperCase() + field.substring(1),
                operator: getOperator(operator),
                value: item.value,
              },
            ],
          }));
        } else if (gridParams.filter?.length) {
          setGridParams((prev) => ({ ...prev, filter: [] }));
        }
      });
    }, 500),
    [gridParams]
  );

  const handlePageChange = useCallback((page: number) => {
    setSelectionMemo([])
    setGridParams((prev) => ({ ...prev, page }));
  }, []);

  const handlePageSizeChange = useCallback((itemsPerPage: number) => {
    setGridParams((prev) => ({ ...prev, page: 1, itemsPerPage }));
  }, []);

  const handleFooter = () => {
    return (
      <DataGridFooter
        gridParams={gridParams}
        selection={selection}
        rows={rows}
        rowCountState={rowCountState}
        endpoint={endpoint}
        filterColunms={filterColunms}
        handlePageSizeChange={handlePageSizeChange}
        handlePageChange={handlePageChange}
        queryClient={queryClient}
        columns={columns}
        setColumns={setColumns}
        refColumns={refColumns}
      />
    )
  }

  useEffect(() => {
    setRowCountState((prev) => rowCount ?? prev);
  }, [rowCount]);

  useMemo(() => {
    const arrayFilter = selection.filter(
      (element, i) => selection.indexOf(element) === i
    );

    setSelectionMemo(arrayFilter);
  }, [selection]);

  useEffect(() => {
    if (!getSelectionModel) return;

    getSelectionModel(
      selection,
      rows.data?.find((row) => row[propertyFilterId] === selection[0])
    );
  }, [selection]);

  useEffect(() => {
    setSelection(selectionMemo);
  }, [rows.data]);

  useEffect(() => {
    if (!gridParams.filter.length && !filterSearchDeferredValue.length) return;

    filterSearchDeferredValue.length
      ? setGridParams((prev) => ({
        ...prev,
        page: 1,
        filter: [...filterParams, ...filterSearchDeferredValue],
      }))
      : setGridParams((prev) => ({ ...prev, filter: filterParams }));
  }, [filterSearchDeferredValue]);

  const refColumns = useRef(rest.columns);
  useEffect(() => {
    setColumns(rest.columns);
  }, []);

  return (
    <Box height="100%" width="90%" marginLeft="5%">
      <ButtonCrud
        selection={selection}
        filterSearch={filterSearch}
        createId={createId}
        updateId={updateId}
        handleSearch={handleSearch}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDetail={handleDetail}
        handleDelete={handleDelete}
      />
      <>
        {rows.isLoading || rows.isFetching ? (
          <SkeletonDataGrid filterColunms={filterColunms} />
        ) : (
          <>
            <MuiDataGrid
              localeText={localeText}
              rows={rows.data ?? []}
              sx={{ maxHeight: '80vh', overflow: 'auto' }}
              rowCount={rowCountState}
              rowSelectionModel={selection}
              onRowSelectionModelChange={(selection) => setSelection(selection)}
              paginationMode="server"
              pagination
              filterMode="server"
              onFilterModelChange={(model) => debounceFilter(model)}
              sortingMode="server"
              onSortModelChange={(model) => {
                model?.[0]?.sort
                  ? setGridParams((prev) => ({
                    ...prev,
                    page: 0,
                    sorter: [
                      {
                        propertyName:
                          model[0].field[0].toUpperCase() +
                          model[0].field.substring(1),
                        direction: `${model[0].sort}`,
                      },
                    ],
                  }))
                  : gridParams.sorter?.length &&
                  setGridParams((prev) => ({ ...prev, sorter: [] }));
              }}
              {...rest}
              slots={{
                footer: handleFooter
              }}
              columns={columns.map((column: any) => {
                switch (column.type) {
                  case "number":
                    return {
                      ...column,
                      filterOperators: getGridNumericOperators().filter(
                        (operator) =>
                          operator.value === ">" ||
                          operator.value === ">=" ||
                          operator.value === "<" ||
                          operator.value === "<=" ||
                          operator.value === "="
                      ),
                    };
                  case "string":
                    return {
                      ...column,
                      filterOperators: getGridStringOperators().filter(
                        (operator) => operator.value === "contains"
                      ),
                    };
                  default:
                    return column;
                }
              })}
            />
          </>
        )}
      </>
    </Box>
  );
};
