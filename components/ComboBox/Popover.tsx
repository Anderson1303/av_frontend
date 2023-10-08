import { TypeOption } from "@/interfaces/IOption";
import { IPagination } from "@/interfaces/IPagination";
import { IResponse } from "@/interfaces/IResponse";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, List, Paper, Popper, Stack, Typography, UseAutocompleteReturnValue } from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";

interface PopoverProps<TOption extends TypeOption> {
  query: UseInfiniteQueryResult<IResponse<TOption[]>, unknown>;
  pagination?: IPagination;
  autocomplete: UseAutocompleteReturnValue<TOption, boolean, boolean, boolean>
  width: number | string;
  children: ReactNode;
}
export function Popover<TOption extends TypeOption>({
  query, pagination, autocomplete, width, children
}: PopoverProps<TOption>) {
  const { popupOpen, anchorEl, groupedOptions, getListboxProps, getOptionProps } = autocomplete
  const { isFetchingNextPage, fetchNextPage } = query
  const currentItem = (pagination?.page ?? 1) * (pagination?.itemsPerPage ?? 10);

  return (
    <Popper
      id={popupOpen ? 'simple-popper' : undefined}
      open={popupOpen} anchorEl={anchorEl}
      sx={{ zIndex: theme => theme.zIndex.modal + 1, width: width }}
    >
      {groupedOptions.length > 0 ? (
        <Paper sx={{ width: width }}>
          <List {...getListboxProps()}
            component="ul"
            sx={{
              overflowX: 'hidden',
              overflowY: 'auto',
              height: 200,
              padding: 0,
              marginTop: 0,
              width: width
            }}
          >
            {children}
          </List>
          <>
            {isFetchingNextPage &&
              <Stack sx={{ alignItems: 'center', }}>
                Loading...
              </Stack>
            }
            {!isFetchingNextPage && (pagination?.totalItems ?? 0) > currentItem &&
              <Stack
                role="listbox"
                sx={{ alignItems: 'center', marginTop: '.5rem' }}
                className="MuiAutocomplete-listbox"
              >
                <Typography variant="body2">
                  {currentItem} de {pagination?.totalItems}
                </Typography>
                <IconButton size='small' onClick={() => fetchNextPage()}>
                  <KeyboardArrowDownIcon color="info" />
                </IconButton>
              </Stack>
            }
          </>
        </Paper>
      ) : null}
    </Popper>
  )
}