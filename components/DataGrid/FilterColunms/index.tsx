import {
  Button,
  Checkbox,
  IconButton,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useState } from "react";
import { useSet } from "../../../structureState/useStateSet";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

type OrderColunmsProps = {
  refColumns: GridColDef[];
  columns: GridColDef[];
  setColumns: Dispatch<SetStateAction<GridColDef[]>>;
};

export const FilterColunms = ({
  refColumns,
  columns,
  setColumns,
}: OrderColunmsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const newSetChecked = useSet(columns);

  const handleToggle = (value: GridColDef) => {
    if (newSetChecked.has(value)) newSetChecked.remove(value);
    else newSetChecked.add(value);

    setColumns(newSetChecked.toArray());
  };

  const handleUncheckAll = () => {
    if (newSetChecked.toArray().length > 0) {
      setColumns([]);
    } else setColumns(refColumns);
  };

  const textButton =
    newSetChecked.toArray().length > 0 ? "Desmarcar todos" : "Marcar todos";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
        onClick={handleClick}
      >
        <Tooltip title="Colunas" placement="top" arrow>
          <ViewColumnIcon color={"primary"} />
        </Tooltip>
      </IconButton>
      <Menu
        id="basic-menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {refColumns.map((value: GridColDef, index: number) => {
          const { field, headerName } = value;
          return (
            <MenuItem key={index}>
              <ListItemButton
                role={undefined}
                onClick={() => handleToggle(value)}
                dense
              >
                <Checkbox
                  edge="start"
                  checked={newSetChecked.has(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": field,
                  }}
                />
                <ListItemText id={field} primary={headerName} />
              </ListItemButton>
            </MenuItem>
          );
        })}
        <Button
          sx={{ margin: 2 }}
          size="small"
          variant="contained"
          color="success"
          onClick={handleUncheckAll}
        >
          {textButton}
        </Button>
      </Menu>
    </>
  );
};
