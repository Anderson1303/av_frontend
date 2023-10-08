import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonProps } from "../Button";

interface ButtonAddProps extends ButtonProps { }

export function ButtonAdd({ ...rest }: ButtonAddProps) {
  return (
    <Button
      loadingPosition="start"
      startIcon={<AddIcon />}
      color="success"
      {...rest}
      sx={{
        ...rest.sx,
        ":disabled": {
          background: theme => theme.palette.success.main, opacity: 0.5
        }
      }}
    >
      {rest.children}
    </Button>
  )
}