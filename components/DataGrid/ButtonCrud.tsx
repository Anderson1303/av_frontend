import { IFilterParams } from "../../interfaces/IGridParams";
import { Skeleton, Stack } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { UseQueryResult } from "@tanstack/react-query";
import { ButtonAdd } from "../Button/ButtonAdd";
import { ButtonDetail } from "../Button/ButtonDetail";
import { ButtonEdit } from "../Button/ButtonEdit";
import { ButtonSearch } from "../Button/ButtonSearch";
import { ButtonDelete } from "../Button/ButtonDelete";
import React from "react";

interface ButtonCrudProps {
  selection: GridRowSelectionModel;
  filterSearch: IFilterParams[];
  createId: string;
  updateId: string;
  handleSearch?: (selection: GridRowSelectionModel) => void;
  handleCreate?: () => void;
  handleUpdate?: (selection: GridRowSelectionModel) => void;
  handleDetail?: (selection: GridRowSelectionModel) => void;
  handleDelete?: (selection: GridRowSelectionModel) => void;
}
export function ButtonCrud({
  selection, filterSearch, createId, updateId, handleSearch,
  handleCreate, handleUpdate, handleDetail, handleDelete
}: ButtonCrudProps) {
  return (
    <Stack direction="row" spacing={1.5} sx={{
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      p: "1rem 2rem",
    }}>
      {
        <>
          {!!handleSearch &&
            <ButtonSearch
              badgeContent={filterSearch.length}
              onClick={() => handleSearch(selection)}
            >
              <b>Pesquisar</b>
            </ButtonSearch>
          }
          {!!handleCreate &&
            <ButtonAdd
              onClick={() => handleCreate()}
              disabled={selection?.length > 0}
            >
              <b>Novo</b>
            </ButtonAdd>
          }
          {!!handleUpdate &&
            <ButtonEdit
              onClick={() => handleUpdate(selection)}
              disabled={selection?.length == 0 || selection?.length > 1}
            >
              <b>Editar</b>
            </ButtonEdit>
          }
          {!!handleDetail &&
            <ButtonDetail
              onClick={() => handleDetail(selection)}
              disabled={selection?.length == 0 || selection?.length > 1}
            >
              <b>Detalhar</b>
            </ButtonDetail>
          }
          {!!handleDelete &&
            <ButtonDelete
              onClick={() => handleDelete(selection)}
              disabled={selection?.length == 0 || selection?.length > 1}
            >
              <b>Excluira</b>
            </ButtonDelete>
          }
        </>
      }
    </Stack>
  )
}