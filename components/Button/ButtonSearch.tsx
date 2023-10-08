import SearchIcon from '@mui/icons-material/Search';
import { Button, ButtonProps } from "../Button";

interface ButtonSearchProps extends ButtonProps { }

export function ButtonSearch({ ...rest }: ButtonSearchProps) {
  return (
    <Button
      loadingPosition="start"
      startIcon={<SearchIcon />}
      color="info"
      {...rest}
      sx={{
        ...rest.sx,
        ":disabled": {
          background: theme => theme.palette.info.main, opacity: 0.5
        }
      }}
    >
      {rest.children}
    </Button>
  )
}