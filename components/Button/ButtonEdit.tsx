import EditIcon from '@mui/icons-material/Edit';
import { Button, ButtonProps } from "../Button";

interface ButtonEditProps extends ButtonProps { }

export function ButtonEdit({ ...rest }: ButtonEditProps) {
  return (
    <Button
      loadingPosition="start"
      startIcon={<EditIcon />}
      color="warning"
      {...rest}
      sx={{
        ...rest.sx,
        ":disabled": {
          background: theme => theme.palette.warning.main, opacity: 0.5
        }
      }}
    >
      {rest.children}
    </Button>
  )
}