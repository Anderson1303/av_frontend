import React from 'react'
import {
  Box,
  Stack,
  Typography,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  Pagination,
} from '@mui/material'
import { GridColDef } from "@mui/x-data-grid"
import RefreshIcon from '@mui/icons-material/Refresh'
import { IGridParams } from '../../../interfaces/IGridParams'

import { FilterColunms } from "../FilterColunms/index"


interface DataGridFooterProps {
  gridParams: IGridParams
  selection: any[]
  rows: any
  rowCountState: number
  endpoint: string
  filterColunms: boolean
  handlePageSizeChange: (size: number) => void;
  handlePageChange: (page: number) => void;
  queryClient: any
  columns: any[]
  setColumns: React.Dispatch<React.SetStateAction<GridColDef[]>>
  refColumns: React.MutableRefObject<any[]>
}

const DataGridFooter = ({
    gridParams,
    selection,
    rows,
    rowCountState,
    endpoint,
    filterColunms,
    handlePageSizeChange,
    handlePageChange,
    queryClient,
    columns,
    setColumns,
    refColumns,
  }: DataGridFooterProps) => {
    const from = (gridParams.page - 1) * gridParams.itemsPerPage;
    const to = gridParams.page * gridParams.itemsPerPage;
  
    const checkUntil = to > rowCountState ? rowCountState : to;
    const checkFrom = checkUntil > 0 ? from + 1 : from;
  
    return (
        <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "1rem",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="body2">
            {selection.length > 1
              ? "Selecionados: "
              : "Selecionado: "}
            {selection.length}
          </Typography>
          <Stack direction="row" spacing={1}>
            <ButtonGroup
              disabled={rows.isLoading || rows.isRefetching}
            >
              {[5, 10, 25, 50, 100].map((size) => (
                <Button
                  key={size}
                  onClick={() => handlePageSizeChange(size)}
                  variant={
                    gridParams.itemsPerPage == size
                      ? "contained"
                      : "outlined"
                  }
                >
                  {size}
                </Button>
              ))}
            </ButtonGroup>
            <IconButton
              disabled={rows.isLoading || rows.isRefetching}
              onClick={() =>
                queryClient.invalidateQueries([endpoint])
              }
            >
              <Tooltip title="Recarregar" placement="top" arrow>
                <RefreshIcon
                  color={
                    rows.isLoading || rows.isRefetching
                      ? "disabled"
                      : "primary"
                  }
                />
              </Tooltip>
            </IconButton>
            {filterColunms && (
              <FilterColunms
                refColumns={refColumns.current}
                columns={columns}
                setColumns={setColumns}
              />
            )}
          </Stack>
        </Stack>
        <Stack spacing={1} sx={{ alignItems: "flex-end" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "1rem",
            }}
          >
            <Typography variant="body2">
              {checkFrom} - {checkUntil} de {rowCountState}
            </Typography>
          </Box>
          <Pagination
            color="primary"
            disabled={rows.isLoading || rows.isRefetching}
            count={
              rowCountState < gridParams.itemsPerPage
                ? 1
                : Math.ceil(
                    rowCountState / gridParams.itemsPerPage
                  )
            }
            page={gridParams.page}
            onChange={(_, value) => handlePageChange(value)}
          />
        </Stack>
      </Box>
    );
  };
  
  export default DataGridFooter;